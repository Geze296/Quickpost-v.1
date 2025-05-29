import { Head } from '@inertiajs/react';
import NavBar from '@/layouts/NavBar';
import { Search, Edit, Trash2, Plus, X, Image, Video, Upload } from 'lucide-react';
import { useState } from 'react';

// Mock data for demonstration
const mockPosts = [
    {
        id: 1,
        content: "Excited to announce our new product launch! 🚀",
        platform: "Twitter",
        scheduledAt: "2024-03-20T10:00:00",
        status: "pending",
        media: {
            type: "image",
            url: "https://example.com/image1.jpg",
            thumbnail: "https://example.com/thumb1.jpg"
        }
    },
    {
        id: 2,
        content: "Check out our latest blog post about social media trends",
        platform: "LinkedIn",
        scheduledAt: "2024-03-21T15:30:00",
        status: "published",
        media: {
            type: "video",
            url: "https://example.com/video1.mp4",
            thumbnail: "https://example.com/video-thumb1.jpg"
        }
    },
    {
        id: 3,
        content: "Behind the scenes of our latest photo shoot 📸",
        platform: "Instagram",
        scheduledAt: "2024-03-22T12:00:00",
        status: "failed",
        media: {
            type: "image",
            url: "https://example.com/image2.jpg",
            thumbnail: "https://example.com/thumb2.jpg"
        }
    }
];

export default function ScheduledPosts() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'published': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredPosts = mockPosts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (post: typeof mockPosts[0]) => {
        setSelectedPost(post);
        setPreviewUrl(post.media.thumbnail);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (post: typeof mockPosts[0]) => {
        setSelectedPost(post);
        setIsDeleteDialogOpen(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleDialogClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsEditDialogOpen(false);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <NavBar title="Scheduled Posts">
            <Head title="Scheduled Posts" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search posts by content, status, or platform..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Posts List */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Content</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Platform</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Scheduled For</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="max-w-xs truncate px-6 py-4">
                                            <div className="text-sm text-gray-900">{post.content}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{post.platform}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {new Date(post.scheduledAt).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(post.status)}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="rounded p-1 text-gray-600 hover:bg-gray-100"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post)}
                                                    className="rounded p-1 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Dialog */}
            {isEditDialogOpen && selectedPost && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    onClick={handleDialogClick}
                >
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Edit Scheduled Post</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditDialogOpen(false);
                                }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    rows={3}
                                    defaultValue={selectedPost.content}
                                />
                            </div>

                            {/* Media Preview and Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Media</label>
                                <div className="mt-2">
                                    {previewUrl && (
                                        <div className="relative mb-4">
                                            {selectedPost.media.type === 'video' ? (
                                                <video
                                                    src={previewUrl}
                                                    className="h-48 w-full rounded-lg object-cover"
                                                    controls
                                                />
                                            ) : (
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="h-48 w-full rounded-lg object-cover"
                                                />
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile();
                                                }}
                                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-center">
                                        <label className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
                                            <Upload className="h-5 w-5 text-gray-500" />
                                            <span className="text-sm text-gray-700">Upload New Media</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*,video/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Platform</label>
                                <select
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    defaultValue={selectedPost.platform}
                                >
                                    <option value="Twitter">Twitter</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    defaultValue={selectedPost.scheduledAt.slice(0, 16)}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditDialogOpen(false);
                                }}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditDialogOpen(false);
                                }}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Dialog */}
            {isDeleteDialogOpen && selectedPost && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    onClick={handleDialogClick}
                >
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Delete Scheduled Post</h3>
                        <p className="mb-6 text-gray-500">
                            Are you sure you want to delete this scheduled post? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleteDialogOpen(false);
                                }}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleteDialogOpen(false);
                                }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NavBar>
    );
}
