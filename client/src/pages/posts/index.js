import {
  loading,
  posts,
  fetch
} from '../../modules/posts'

export default {
  name: 'PostsIndexPage',

  template: `
    <div class="container">
      <header>
        <h1>Blog</h1>
        <button @click="fetch" :disabled="loading" v-text="loading ? 'Refreshing...' : 'Refresh'"></button>
        <a v-link="{ name: 'posts.create' }">Create post</a>
      </header>

      <main class="posts">
        <article class="post post--minimal" v-if="posts.length" v-for="post in posts">
          <header class="post__header">
            <h2 class="post__title" v-text="post.title"></h2>
            <time :datetime="createdAt" v-text="post.createdAt | humanDate"></time>
          </header>
          <main class="post__content">
            <p v-html="post.body | readMore | markdown"></p>
          </main>
          <a v-link="{ name: 'posts.show', params: { id: post.id } }">Read more</a>
        </article>

        <p v-if="!loading && !posts.length">No posts yet...</p>
      </main>
    </div>
  `,

  ready() {
    this.fetch()
  },

  vuex: {
    getters: {
      loading,
      posts
    },
    actions: {
      fetch
    }
  },

  filters: {
    readMore: value =>  value.slice(0, 240) + '...'
  }
}
