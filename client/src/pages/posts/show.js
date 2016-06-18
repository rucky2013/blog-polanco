import {
  loading,
  post,
  find
} from '../../modules/posts'

export default {
  name: 'PostsShowPage',

  template: `
    <div class="container">
      <template v-if="!!post">
        <header class="post__header">
          <h2 class="post__title" v-text="post.title"></h2>
          <time :datetime="createdAt" v-text="post.createdAt"></time>
        </header>
        <main class="post__content" v-text="post.body"></main>
      </template>

      <p v-if="!post && loading">Loading...</p>

      <p v-if="!post && !loading">Not Found.</p>
    </div>
  `,

  ready() {
    const id = parseInt(this.$route.params.id, 10)
    console.log({id})
    this.find(id)
  },

  vuex: {
    getters: {
      loading,
      post
    },
    actions: {
      find
    }
  }
}
