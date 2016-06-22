import {
  error,
  newPost,
  store
} from '../../modules/posts'

export default {
  name: 'PostsCreatePage',

  template: `
    <div class="container">
      <h2>Create Post</h2>

      <form class="create-post" @submit.prevent="store(newPost)">
        <label>
          <span>Title</span>
          <input type="text" placeholder="Title" v-model="newPost.title"/>
        </label>

        <label>
          <span>Body</span>
          <textarea placeholder="Body" v-model="newPost.body"></textarea>
        </label>

        <output v-if="!!error" v-text="error"></output>

        <button type="submit">Publish</button>
      </form>
    </div>
  `,

  vuex: {
    getters: {
      error,
      newPost
    },
    actions: {
      store
    }
  }
}
