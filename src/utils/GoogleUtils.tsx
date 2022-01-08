export function wasAlreadyLoggedIn() {
    return getGoogleIdFromLocalStorage() !== null;
}

let refreshTimeout;

export function refreshTokenSetup(res) {

    //refresh has already been started
    if (refreshTimeout) {
        return;
    }

    let refreshTiming = ((res.tokenObj.expires_in || 3600) - 5 * 60) * 1000;

    refreshTimeout = setTimeout(() => {
        refreshToken(res).then(token => {
            refreshTiming = (token.expires_in || 3600 - 5 * 60) * 1000;
            refreshTimeout = setTimeout(refreshToken, refreshTiming);
        })
    }, refreshTiming);
}

export function refreshToken(obj): Promise<any> {
    return new Promise((resolve, reject) => {
        if (typeof localStorage === "undefined") {
            resolve(null);
        }
        obj.reloadAuthResponse().then(refreshToken => {
            localStorage.setItem('googleId', refreshToken.id_token);
            resolve(refreshToken);
        });
    });
}

export function getGoogleIdFromLocalStorage() {
    return typeof localStorage !== "undefined" ? localStorage.getItem('googleId') : null;
}

export const googlePlayPackageName = 'de.flou.hypixel.skyblock';