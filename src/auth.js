//PHOENIX JS init
import { init } from '@phoenixlan/phoenix.js'
init(__myapp.env.API_URL ?? "https://api.test.phoenixlan.no")

import { writable } from 'svelte/store'
export let authenticated = writable(false)

export function login() {
    // Generate auth URL and redirect
    const baseURL = 
        (__myapp.env.APP_HOST && __myapp.env.APP_PROTOCOL) 
        ? `${__myapp.env.APP_PROTOCOL}:\/\/${__myapp.env.APP_HOST}`  
        : "http://checkin.dev.phoenixlan.no:8080"
    const client_id = __myapp.env.API_OAUTH_CLIENT_ID ?? "phoenix-checkin-localdev"
    const authUrl = User.getAuthenticationUrl(baseURL, client_id)
    window.location.href = authUrl
}
export function logout() {
    window.localStorage.removeItem("auth")
    authenticated.set(false)
}

import { User } from '@phoenixlan/phoenix.js'

export async function checkAuth() {
    // Create storage variable with information from local storage.
    const storage = window.localStorage.getItem("auth")
    if(!storage){
        const url = new URL(window.location.href)
        const code = url.searchParams.get("code")
        if (code) {
            try {
                // Get token, refreshToken and set authstate  based on token & refreshToken.
                await User.Oauth.authenticateByCode(code);
                
                let Token 		 = await User.Oauth.getToken();
                let RefreshToken = await User.Oauth.getRefreshToken();
                
                await User.Oauth.setAuthState(Token, RefreshToken);
                authenticated.set(true)
                
                // Store user information in the local storage for later use.
                window.localStorage.setItem("auth", JSON.stringify({
                    token: 		  Token,
                    refreshToken: RefreshToken,
                }));
            }
            catch(e){
                console.error('An error occured, failed to authenticate by token. (Is the token valid?)');
                console.error('[API] ' + e);
            }
        } else {
            // If there is no "auth" in the local storage, show login page.
            console.warn("Requested information was not found in the local storage.");
        }
    } else {
        // If storage contains "auth" with correct information.
        let object = JSON.parse(storage);
        if(object.token && object.refreshToken) {
            // Try to setAuthState with existing token & refreshToken.
            try {
                await User.Oauth.setAuthState(object.token, object.refreshToken);
                authenticated.set(true)
            }
            catch (e) {
                console.error('[API] ' + e);
            }
        } else {
        // Conclude that local storage is corrupted or modified by the user or third-party app, delete the data.
            window.localStorage.removeItem("auth");
        }
    }
}