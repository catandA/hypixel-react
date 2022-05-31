import { get, set, clear } from 'idb-keyval'
import api from '../api/ApiHelper'
import { isClientSideRendering } from './SSRUtils'

let cacheUtils: CacheUtils = {
    checkForCacheClear: function () {
        if (!isClientSideRendering()) {
            return
        }
        api.getVersion().then(version => {
            let localVersion = window.localStorage.getItem('version')
            if (window.caches !== undefined && localVersion !== version) {
                // clear workbox caches
                caches
                    .keys()
                    .then(keys => {
                        keys.forEach(key => {
                            caches.delete(key)
                        })
                    })
                    .catch(() => {})
                // clear index db
                clear()
            }
            window.localStorage.setItem('version', version)
        })
    },
    clearAll: function () {
        if (!isClientSideRendering()) {
            return
        }
        if (window.caches !== undefined) {
            caches.keys().then(keys => {
                keys.forEach(key => {
                    caches.delete(key)
                })
            })
            clear()
        }
    }
}
export default cacheUtils

interface CacheEntry {
    expireTimeStamp: number
    response: ApiResponse
}
