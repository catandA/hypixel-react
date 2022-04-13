import React, { useState } from 'react'
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn'
import Payment from '../Payment/Payment'

export default function CoflCoinsPurchase() {
    let [isLoggedIn, setIsLoggedIn] = useState(false)

    function onLogin() {
        let googleId = localStorage.getItem('googleId')
        if (googleId) {
            setIsLoggedIn(true)
        }
    }

    function onLoginFail() {
        setIsLoggedIn(false)
    }

    return (
        <div className="cofl-coins-purchase">
            {!isLoggedIn ? <p>To buy and use CoflCoins you need to be logged in with Google</p> : ''}
            <GoogleSignIn onAfterLogin={onLogin} onLoginFail={onLoginFail} />
            {isLoggedIn ? <Payment /> : ''}
        </div>
    )
}
