import store from './store'
import AppHeader from './components/app-header'

export default {
  store,

  template: `
    <div id="shell">
      <app-header></app-header>
      <main>
        <router-view keep-alive></router-view>
      </main>
    </div>
  `,

  components: {
    AppHeader
  }
}
