export default {
  template: `
    <header class="app-header">
      <div class="container">
        <nav class="nav">
          <a class="nav__link" v-link="{ name: 'posts.index', activeClass: 'nav__link--active' }">Blog</a>
          <a class="nav__link" v-link="{ name: 'about', activeClass: 'nav__link--active' }">About</a>
        </nav>
      </div>
    </header>
  `
}
