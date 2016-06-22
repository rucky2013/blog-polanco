import {
  loading as loadingPost,
  post,
  find as findPost,
  remove as removePost
} from '../../modules/posts'
import {
  loading as loadingComments,
  comments,
  error as commentsError,
  fetch as fetchComments,
  store as storeComment,
  remove as removeComment,
  newComment
} from '../../modules/comments'

export default {
  name: 'PostsShowPage',

  template: `
    <div class="container">
      <template v-if="!!post">
        <div class="post">
          <header class="post__header">
            <h2 class="post__title" v-text="post.title"></h2>
            <a v-link="{ name: 'posts.edit', params: { id: post.id } }">Edit post</a>
            <button @click="tryRemovePost(post)">Delete</button>
            <time :datetime="createdAt" v-text="post.createdAt | humanDate"></time>
          </header>
          <main class="post__content" v-html="post.body | markdown"></main>
        </div>

        <hr />

        <section class="comments">
          <h3>Comments</h3>
          <article class="comment" v-if="comments.length" v-for="comment in comments">
            <header>
              <time :datetime="createdAt" v-text="createdAt | fromNow"></time>
              <a v-link="{ name: 'comments.edit', params: { postId: post.id, id: comment.id } }">Edit comment</a>
              <button @click="tryRemoveComment(post.id, comment)">Delete</button>
            </header>
            <main v-html="comment.body | markdown"></main>
          </article>

          <p v-if="!loadingComments && !comments.length">No comments yet...</p>

          <hr />
          <section>
            <form @submit.prevent="storeComment(post.id, newComment)">
              <label>
                <span>Body</span>
                <textarea placeholder="Body" v-model="newComment.body"></textarea>
              </label>

              <output v-if="!!commentsError" v-text="error"></output>

              <button type="submit">Comment</button>
            </form>
          </section>
        </section>
      </template>

      <p v-if="!post && loadingPost">Loading...</p>

      <p v-if="!post && !loadingPost">Not Found.</p>
    </div>
  `,

  attached() {
    const id = parseInt(this.$route.params.id, 10)
    this.findPost(id)
    this.fetchComments(id)
  },

  vuex: {
    getters: {
      loadingPost,
      post,
      loadingComments,
      comments,
      commentsError,
      newComment
    },
    actions: {
      findPost,
      removePost,
      fetchComments,
      storeComment,
      removeComment
    }
  },

  methods: {
    tryRemovePost(post) {
      const response = confirm('Are you sure you want to remove this post?')
      if(response)
        this.removePost(post)
    },

    tryRemoveComment(postId, comment) {
      const response = confirm('Are you sure you want to remove this comment?')
      if(response)
        this.removeComment(postId, comment)
    }
  }
}
