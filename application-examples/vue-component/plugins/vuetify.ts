// @ts-ignore
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
    mdiCogOutline,
    mdiDelete,
    mdiFileImportOutline,
    mdiHelpCircleOutline,
    mdiImageFilterCenterFocus,
    mdiPlusThick,
    mdiMenuDown,
    mdiInformationOutline
} from '@mdi/js'

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            addNode: mdiPlusThick,
            deleteGraph: mdiDelete,
            importExport: mdiFileImportOutline,
            resetView: mdiImageFilterCenterFocus,
            settings: mdiCogOutline,
            helpCircle: mdiHelpCircleOutline,
            menuDown: mdiMenuDown,
            info: mdiInformationOutline
        },
        sets: {
            mdi
        }
    }
})
