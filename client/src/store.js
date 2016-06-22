import posts, { postsMiddleware } from './modules/posts'
import comments from './modules/comments'

export default new Vuex.Store({
  modules: {
    posts,
    comments
  },
  middlewares: [
    postsMiddleware
  ]
})
