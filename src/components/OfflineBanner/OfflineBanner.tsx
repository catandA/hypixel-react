import React, { useEffect, useState } from 'react';
import './OfflineBanner.css';



export function OfflineBanner(props: any) {
    let [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        window.addEventListener('online', setOnlineState);
        window.addEventListener('offline', setOnlineState)

        return () => {
            window.removeEventListener('online', setOnlineState);
            window.removeEventListener('offline', setOnlineState);
        }
    }, [])

    function setOnlineState() {
        if (typeof navigator === "undefined") {
            return;
        }
        setIsOnline(navigator.onLine);
    }

    return (
        <div>
            {
                !isOnline ?
                    <div id="offline-banner" className="offline-banner">
                        <span style={{ color: "white" }}>No connection</span>
                    </div> : ""
            }
        </div>
    )
}