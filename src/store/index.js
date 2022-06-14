import { createStore, createLogger } from 'vuex'
import panel from "@/store/modules/panel";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        panel
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})