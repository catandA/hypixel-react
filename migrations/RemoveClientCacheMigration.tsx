import { clear } from 'idb-keyval'
import { isClientSideRendering } from '../utils/SSRUtils'

export function startEmptyFlipRestrictionMigration() {
    if (!isClientSideRendering()) {
        return
    }
    clear()
}
