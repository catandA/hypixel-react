import { useEffect, useRef, useState } from 'react'
import api from '../api/ApiHelper'
import { CUSTOM_EVENTS } from '../api/ApiTypes.d'
import { subscribeToCoflcoinChange } from './CoflCoinsUtils'
import { isClientSideRendering } from './SSRUtils'

export function useForceUpdate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [update, setUpdate] = useState(0)
    return () => setUpdate(update => update + 1)
}

export function useSwipe(onSwipeUp?: Function, onSwipeRight?: Function, onSwipeDown?: Function, onSwipeLeft?: Function) {
    if (!isClientSideRendering()) {
        return
    }

    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchmove', handleTouchMove, false)

    var xDown = null
    var yDown = null

    function getTouches(evt) {
        return (
            evt.touches || // browser API
            evt.originalEvent.touches
        ) // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0]
        xDown = firstTouch.clientX
        yDown = firstTouch.clientY
    }

    function handleTouchMove(evt) {
        if (xDown === null || yDown === null) {
            return
        }

        var xUp = evt.touches[0].clientX
        var yUp = evt.touches[0].clientY

        var xDiff = xDown! - xUp
        var yDiff = yDown! - yUp

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                if (onSwipeLeft) {
                    onSwipeLeft()
                }
            } else {
                if (onSwipeRight) {
                    onSwipeRight()
                }
            }
        } else {
            if (yDiff > 0) {
                if (onSwipeUp) {
                    onSwipeUp()
                }
            } else {
                if (onSwipeDown) {
                    onSwipeDown()
                }
            }
        }
        /* reset values */
        xDown = null
        yDown = null
    }

    return () => {
        document.removeEventListener('touchstart', handleTouchStart, false)
        document.removeEventListener('touchmove', handleTouchMove, false)
    }
}

export function useCoflCoins() {
    const [coflCoins, setCoflCoins] = useState(-1)

    useEffect(() => {
        document.addEventListener(CUSTOM_EVENTS.GOOGLE_LOGIN, loadCoflCoinBalance)

        if (!!(window as any).googleAuthObj) {
            loadCoflCoinBalance()
        }

        let unsubscribeFunction = subscribeToCoflcoinChange(function (coflCoins) {
            setCoflCoins(coflCoins)
        })

        return () => {
            unsubscribeFunction()
            document.removeEventListener(CUSTOM_EVENTS.GOOGLE_LOGIN, loadCoflCoinBalance)
        }
    }, [])

    function loadCoflCoinBalance() {
        api.getCoflcoinBalance().then(balance => {
            setCoflCoins(balance)
        })
    }

    return [coflCoins]
}
