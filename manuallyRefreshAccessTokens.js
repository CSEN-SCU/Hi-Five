import { getUsers } from './backend/Firebase/users.js';
import { refreshAccessToken } from './backend/SpotifyAPI/auth.js';

async function manuallyRefreshAccessTokens() {
    const userIds = Object.keys(await getUsers());
    const refreshPromises = userIds.map(userId => refreshAccessToken(userId, true));
    await Promise.all(refreshPromises);
}

export { manuallyRefreshAccessTokens };