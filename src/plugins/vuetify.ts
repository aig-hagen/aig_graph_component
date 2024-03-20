import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
    mdiCogOutline,
    mdiDelete,
    mdiFileImportOutline,
    mdiHelp,
    mdiImageFilterCenterFocus,
    mdiPlusThick
} from '@mdi/js'

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            addNode: mdiPlusThick,
            deleteGraph: mdiDelete,
            help: mdiHelp,
            importExport: mdiFileImportOutline,
            resetView: mdiImageFilterCenterFocus,
            settings: mdiCogOutline
        },
        sets: {
            mdi
        }
    }
})
