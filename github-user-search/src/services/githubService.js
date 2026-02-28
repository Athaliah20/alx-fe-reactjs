import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetches user data from the GitHub API using the search term provided.
 * @param {string} username - The GitHub username to search for.
 * @returns {Promise<Object>} - The user data from the GitHub API.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, {
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches users based on advanced search criteria.
 * @param {string} query - The search query.
 * @param {string} location - Filter by location.
 * @param {number} minRepos - Filter by minimum repositories.
 * @param {number} page - Page number for pagination.
 * @returns {Promise<Object>} - The search results from GitHub API.
 */
export const fetchAdvancedUserData = async (query, location = '', minRepos = 0, page = 1) => {
  try {
    let fullQuery = query;
    if (location) fullQuery += `+location:${location}`;
    if (minRepos > 0) fullQuery += `+repos:>=${minRepos}`;

    const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users?q=${fullQuery}&page=${page}&per_page=10`, {
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
