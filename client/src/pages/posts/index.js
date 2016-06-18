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
        <h2>Blog</h2>
        <button @click="fetch" :disabled="loading" v-text="loading ? 'Refreshing...' : 'Refresh'"></button>
        <a v-link="{ name: 'posts.create' }">Create post</a>
      </header>

      <main class="posts">
        <article class="post post--minimal" v-if="posts.length" v-for="post in posts">
          <header class="post__header">
            <h2 class="post__title" v-text="post.title"></h2>
            <time :datetime="createdAt" v-text="post.createdAt | fromNow"></time>
          </header>
          <main class="post__content" v-text="post.body"></main>
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
    readMore(content){
      return content.slice(0, 240) + '...'
    },

    fromNow(date) {
      return moment.utc(date).local().format('MMMM, Do, YYYY H:mm')
    }
  }
}
