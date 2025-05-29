<?php

namespace App\Http\Controllers;

use JanuSoftware\Facebook\Facebook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class FacebookController extends Controller
{
    //
    public function getFacebookPages()
    {
        $user = auth()->user();

        $account = $user->socialAccounts()->where('platform', 'facebook')->first();
        if (!$account) {
            return response()->json(['error' => 'No connected Facebook account'], 404);
        }

        $response = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $account->access_token,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch pages'], 500);
        }

        return $response->json()['data'];
    }

    // analytics

    public function getPageAnalytics(Request $request)
    {
        try {
            $request->validate(['page_id' => 'required|string']);

            $user = auth()->user();
            $account = $user->socialAccounts()->where('platform', 'facebook')->first();

            if (!$account) {
                return response()->json(['error' => 'No connected Facebook account'], 404);
            }

            $fb = new Facebook([
                'app_id' => config('services.facebook.client_id'),
                'app_secret' => config('services.facebook.client_secret'),
                'default_graph_version' => 'v22.0',
            ]);

            // Get page access token
            $pages = $fb->get('/me/accounts', $account->access_token)->getDecodedBody();
            $page = collect($pages['data'])->firstWhere('id', $request->page_id);

            if (!$page) {
                return response()->json(['error' => 'Page not found or access denied'], 403);
            }

            // Use valid metrics
            $metrics = implode(',', [
                'page_impressions',
                'page_engaged_users',
                'page_fans'
            ]);

            $response = $fb->get(
                "/{$request->page_id}/insights?metric={$metrics}",
                $page['access_token']
            );

            return response()->json([
                'success' => true,
                'data' => $response->getDecodedBody()['data']
            ]);

        } catch (\JanuSoftware\Facebook\Exception\ResponseException $e) {
            return response()->json([
                'error' => 'Facebook API Error: ' . $e->getMessage(),
                'hint' => 'Ensure valid metrics are used. See: https://developers.facebook.com/docs/graph-api/reference/page/insights/'
            ], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }



    public function publishToFacebook(Request $request)
    {
        $request->validate([
            'page_id' => 'required',
            'message' => 'required|string|max:1000',
        ]);

        $user = auth()->user();

        $account = $user->socialAccounts()->where('platform', 'facebook')->first();
        if (!$account) {
            return response()->json(['error' => 'No connected Facebook account'], 404);
        }

        // Get page access token
        $pages = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $account->access_token,
        ]);

        $page = collect($pages->json()['data'] ?? [])->firstWhere('id', $request->page_id);
        if (!$page) {
            return response()->json(['error' => 'Page not found or unauthorized'], 403);
        }

        // // Post to the page
        $post = Http::post("https://graph.facebook.com/{$page['id']}/feed", [
            'message' => $request->message,
            'access_token' => $page['access_token'],
        ]);

        if ($post->failed()) {
            return response()->json(['error' => 'Failed to publish post'], 500);
        }

        return response()->json(['success' => true, 'post' => $post->json()]);

    }

    public function pages()
    {
        $user = auth()->user();
        $social = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$social) {
            return response()->json(['error' => 'Facebook not connected'], 403);
        }

        $userAccessToken = $social->access_token;

        $response = Http::get('https://graph.facebook.com/v19.0/me/accounts', [
            'access_token' => $userAccessToken,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => $response->json()], 500);
        }

        return response()->json($response->json());
    }

    public function getFacebookPosts(Request $request)
    {
        $pageId = $request->pageId;
        $user = auth()->user();
        $social = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$social) {
            return response()->json(['error' => 'Facebook not connected'], 403);
        }

        // Step 1: Get list of pages with tokens
        $accountResponse = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $social->access_token,
        ]);

        if ($accountResponse->failed()) {
            return response()->json(['error' => 'Unable to fetch user pages'], 500);
        }

        $pages = $accountResponse->json('data');
        $matchedPage = collect($pages)->firstWhere('id', $pageId);

        if (!$matchedPage || !isset($matchedPage['access_token'])) {
            return response()->json(['error' => 'Page access token not found'], 404);
        }

        $pageAccessToken = $matchedPage['access_token'];

        // Step 2: Fetch posts
        $posts = Http::get("https://graph.facebook.com/v19.0/{$pageId}/posts", [
            'fields' => 'id,message,created_time,permalink_url,full_picture,insights.metric(post_impressions),shares',
            'access_token' => $pageAccessToken,
        ]);

        if ($posts->failed()) {
            return response()->json(['error' => $posts->json()], 500);
        }

        return response()->json($posts->json());
    }


    // app/Http/Controllers/FacebookController.php





    public function getPostInsights(Request $request)
    {
        $request->validate([
            'post_id' => 'required|string',
            'page_id' => 'required|string',
        ]);

        $user = $request->user();
        $account = $user->socialAccounts()->where('platform', 'facebook')->first();

        if (!$account) {
            return response()->json(['error' => 'No connected Facebook account'], 404);
        }

        // Get page access token
        $pages = Http::get("https://graph.facebook.com/v19.0/me/accounts", [
            'access_token' => $account->access_token,
        ]);

        $page = collect($pages->json()['data'] ?? [])->firstWhere('id', $request->page_id);

        if (!$page) {
            return response()->json(['error' => 'Page not found or unauthorized'], 403);
        }

        // Get post insights using fields parameter
        $insights = Http::get("https://graph.facebook.com/v19.0/{$request->post_id}", [
            'fields' => 'insights.metric(engagements,impressions,reach,reactions,comments,shares).period(lifetime)',
            'access_token' => $page['access_token'],
        ]);

        if ($insights->failed()) {
            return response()->json(['error' => 'Failed to fetch insights', 'details' => $insights->json()], 500);
        }

        return response()->json([
            'insights' => $this->formatInsights($insights->json()['insights'] ?? []),
        ]);
    }

    protected function formatInsights(array $rawInsights)
    {
        $formatted = [];

        foreach ($rawInsights['data'] ?? [] as $metric) {
            $formatted[$metric['name']] = $metric['values'][0]['value'] ?? 0;
        }

        return [
            'engagements' => $formatted['engagements'] ?? 0,
            'impressions' => $formatted['impressions'] ?? 0,
            'reach' => $formatted['reach'] ?? 0,
            'reactions' => $this->sumReactions($formatted['reactions'] ?? []),
            'comments' => $formatted['comments'] ?? 0,
            'shares' => $formatted['shares'] ?? 0,
        ];
    }

    protected function sumReactions($reactionsData)
    {
        if (!is_array($reactionsData))
            return 0;

        return array_sum(array_values($reactionsData));
    }

}
