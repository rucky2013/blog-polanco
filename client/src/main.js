import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import Shell from './shell'

sync(store, router)

router.start(Shell, '#target')
