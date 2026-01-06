import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
    mdiCogOutline,
    mdiDelete,
    mdiFileImportOutline,
    mdiHelp,
    mdiHelpCircleOutline,
    mdiImageFilterCenterFocus,
    mdiPlusThick,
    mdiMenuDown
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
            settings: mdiCogOutline,
            helpCircle: mdiHelpCircleOutline,
            menuDown: mdiMenuDown
        },
        sets: {
            mdi
        }
    }
})
