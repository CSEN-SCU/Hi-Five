"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Browser compaitable function to encode base64 string.
 */
const encodeBase64 = typeof Buffer === "undefined"
    ? btoa
    : buffer => Buffer.from(buffer).toString('base64');
/**
 * A manager to perform actions regarding the authorization to the web api.
 */
class AuthManager {
    /**
     * A manager to perform actions regarding the authorization to the web api.
     *
     * @param token Your spotify web api token.
     * @example const auth = new AuthManager('token');
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * Returns an api token from your spotify application client id and client secret!
     *
     * @param clientID Your spotify app's client id.
     * @param clientSecret Your spotify app's client secret.
     * @example await auth.getApiToken('id', 'secert');
     */
    async getApiToken(clientID, clientSecret) {
        const { data } = await (0, axios_1.default)({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'client_credentials',
                token: this.token,
                client_id: clientID,
                client_secret: clientSecret
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        return data.access_token;
    }
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
    async getUserToken(options) {
        if (!options.refreshToken && !options.code)
            throw new TypeError("The 'refresh token' and the 'authorization code' supplied to generate a user token is invalid.");
        let grant_type = (options.refreshToken && !options.code)
            ? "refresh_token"
            : "authorization_code";
        const { data } = await (0, axios_1.default)({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            params: {
                grant_type,
                code: options.code,
                refresh_token: options.refreshToken,
                redirect_uri: options.redirectURL,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encodeBase64(options.clientID + ":" + options.clientSecret)}`,
            },
        });
        return {
            accessToken: data.access_token,
            tokenType: data.token_type,
            scope: data.scope,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        };
    }
}
exports.AuthManager = AuthManager;
