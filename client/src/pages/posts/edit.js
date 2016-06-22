import {
  loading,
  post,
  find,
  replace,
  remove
} from '../../modules/posts'

export default {
  name: 'PostsEditPage',

  template: `
    <div class="container">
      <template v-if="!!post.id">
        <h2>Edit Post</h2>
        <button @click="tryRemove">Delete</button>

        <form class="create-post" @submit.prevent="replace(post)">
          <label>
            <span>Title</span>
            <input type="text" placeholder="Title" v-model="post.title"/>
          </label>

          <label>
            <span>Body</span>
            <textarea placeholder="Body" v-model="post.body"></textarea>
          </label>

          <output v-if="!!error" v-text="error"></output>

          <button type="submit">Edit</button>
        </form>
      </template>

      <p v-if="!post.id && loading">Loading...</p>

      <p v-if="!post.id && !loading">Not Found.</p>
    </div>
  `,

  attached() {
    const id = parseInt(this.$route.params.id, 10)
    this.find(id)
  },

  vuex: {
    getters: {
      loading,
      post
    },
    actions: {
      find,
      replace,
      remove
    }
  },

  methods: {
    tryRemove() {
      const response = confirm('Are you sure you want to remove this post?')
      if(response)
        this.remove(this.post)
    }
  }
}
