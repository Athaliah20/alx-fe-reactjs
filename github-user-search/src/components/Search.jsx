import React, { useState } from 'react';
import { fetchAdvancedUserData } from '../services/githubService';

const Search = () => {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const handleSearch = async (e, newPage = 1) => {
        if (e) e.preventDefault();
        if (!query.trim() && !location.trim() && minRepos === 0) return;

        setLoading(true);
        setError(null);
        if (newPage === 1) {
            setUsers([]);
            setPage(1);
        }

        try {
            const data = await fetchAdvancedUserData(query, location, minRepos, newPage);
            if (newPage === 1) {
                setUsers(data.items);
            } else {
                setUsers((prev) => [...prev, ...data.items]);
            }
            setHasMore(data.items.length === 10);
            setPage(newPage);
        } catch (err) {
            setError("Looks like we cant find the user");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        handleSearch(null, page + 1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced GitHub User Search</h2>
                <form onSubmit={(e) => handleSearch(e)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Username / Keyword</label>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Location</label>
                            <input
                                type="text"
                                placeholder="e.g. San Francisco"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Min. Repositories</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={minRepos}
                                onChange={(e) => setMinRepos(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-auto self-end px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Search Now
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {loading && page === 1 && (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-6 hover:shadow-xl transition-shadow group">
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-20 h-20 rounded-full border-4 border-gray-50 object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                    {user.login}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">Location: {user.location || 'Not specified'}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4"
                                >
                                    View GitHub Profile
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && !loading && (
                    <div className="flex justify-center mt-12 mb-8">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-sm"
                        >
                            Load More Results
                        </button>
                    </div>
                )}

                {loading && page > 1 && (
                    <p className="text-center text-gray-500 font-medium py-4">Loading more results...</p>
                )}
            </div>
        </div>
    );
};

export default Search;
