import type { GetUserTokenOptions, UserTokenContext } from "../Interface";
/**
 * A manager to perform actions regarding the authorization to the web api.
 */
export declare class AuthManager {
    token: string;
    /**
     * A manager to perform actions regarding the authorization to the web api.
     *
     * @param token Your spotify web api token.
     * @example const auth = new AuthManager('token');
     */
    constructor(token: string);
    /**
     * Returns an api token from your spotify application client id and client secret!
     *
     * @param clientID Your spotify app's client id.
     * @param clientSecret Your spotify app's client secret.
     * @example await auth.getApiToken('id', 'secert');
     */
    getApiToken(clientID: string, clientSecret: string): Promise<string>;
    /**
     * Returns a acces token of a spotify user through the authorization process.
     *
     * @param options Options required to get spotify user token!
     * @example
     * await auth.getUserToken({
     *    clientID: 'id',
     *    clientSecret: 'secret',
     *    code: 'code', // If attempting to get user token through authorization
     *    refreshToken: 'token', // If attempting to refresh token!
     *    redirectURL: 'url' // Needs to be the same what you have enetered while authorizing the token!
     * })
     */
    getUserToken(options: GetUserTokenOptions): Promise<UserTokenContext>;
}
