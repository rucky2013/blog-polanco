import {
  error,
  store
} from '../../modules/posts'

export default {
  name: 'PostsCreatePage',

  template: `
    <div class="container">
      <h2>Create Post</h2>

      <form class="create-post" @submit.prevent="store(post)">
        <label>
          <span>Title</span>
          <input type="text" placeholder="Title" v-model="post.title"/>
        </label>

        <label>
          <span>Body</span>
          <textarea placeholder="Body" v-model="post.body"></textarea>
        </label>

        <output v-if="!!error" v-text="error"></output>

        <button type="submit">Publish</button>
      </form>
    </div>
  `,

  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },

  vuex: {
    getters: {
      error
    },
    actions: {
      store
    }
  }
}
