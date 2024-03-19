import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiDelete, mdiFileImportOutline, mdiImageFilterCenterFocus, mdiPlusThick } from '@mdi/js'

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            addNode: mdiPlusThick,
            deleteGraph: mdiDelete,
            resetView: mdiImageFilterCenterFocus,
            importExport: mdiFileImportOutline
        },
        sets: {
            mdi
        }
    }
})
