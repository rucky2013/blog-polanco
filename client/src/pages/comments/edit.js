import {
  loading,
  comment,
  find,
  replace,
  remove
} from '../../modules/comments'

export default {
  name: 'CommentsEditPage',

  template: `
    <div class="container">
      <template v-if="!!comment.id">
        <h2>Edit Comment</h2>
        <button @click="tryRemove">Delete</button>

        <form class="create-comment" @submit.prevent="tryReplace">
          <label>
            <span>Body</span>
            <textarea placeholder="Body" v-model="comment.body"></textarea>
          </label>

          <output v-if="!!error" v-text="error"></output>

          <button type="submit">Edit</button>
        </form>
      </template>

      <p v-if="!comment.id && loading">Loading...</p>

      <p v-if="!comment.id && !loading">Not Found.</p>
    </div>
  `,

  attached() {
    const id = parseInt(this.$route.params.id, 10)
    this.find(id)
  },

  vuex: {
    getters: {
      loading,
      comment
    },
    actions: {
      find,
      replace,
      remove
    }
  },

  methods: {
    tryReplace() {
      const postId = parseInt(this.$route.params.postId, 10)
      this.replace(postId, this.comment)
    },

    tryRemove(comment) {
      const response = confirm('Are you sure you want to remove this comment?')
      if(response) {
        const postId = parseInt(this.$route.params.postId, 10)
        this.remove(postId, this.comment)
      }
    }
  }
}
