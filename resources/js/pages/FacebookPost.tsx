import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FacebookAnalytics() {
    const [pages, setPages] = useState([]);
    const [selectedpage_id, setSelectedpage_id] = useState('');
    const [analytics, setAnalytics] = useState(null);

    // Fetch pages on component mount
    const fetchPages = async () => {
        try {
            const response = await axios.get('/api/facebook/pages');
            setPages(response.data);
            console.log(pages);
            
        } catch (error) {
            console.error('Failed to fetch pages:', error);
        }
    };
    useEffect(() => {
        fetchPages();
    }, []);


    // Fetch analytics for the selected page
    const fetchAnalytics = async () => {
        try {
            const response = await axios.post('/api/facebook/analytics', {
                page_id: selectedpage_id,
            });
            setAnalytics(response.data);
        } catch (error) {
            console.error('Full error:', error.response); // Check the response body
            alert(error.response?.data?.error || 'Failed to fetch analytics');
        }
    };

    return (
        <div>
            <h2>Facebook Analytics</h2>
            <button onClick={fetchPages}>Load Pages</button>
            
            {/* Dropdown to select a page */}
            <select 
                value={selectedpage_id} 
                onChange={(e) => setSelectedpage_id(e.target.value)}
                disabled={!pages.length}
            >
                <option value="">Select a Page</option>
                {pages.map((page) => (
                    <option key={page.id} value={page.id}>
                        {page.name}
                    </option>
                ))}
            </select>

            <button onClick={fetchAnalytics} disabled={!selectedpage_id}>
                Get Analytics
            </button>

            {/* Display analytics data */}
            {analytics && (
                <pre>{JSON.stringify(analytics, null, 2)}</pre>
            )}
        </div>
    );
}