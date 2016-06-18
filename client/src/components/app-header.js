export default {
  template: `
    <header class="app-header">
      <div class="container">
        <nav class="nav nav--inline">
          <a class="nav__link" v-link="{ name: 'home', exact: true }">Home</a>
          <a class="nav__link" v-link="{ name: 'posts.index' }">Blog</a>
          <a class="nav__link" v-link="{ name: 'about' }">About</a>
        </nav>
      </div>
    </header>
  `
}
