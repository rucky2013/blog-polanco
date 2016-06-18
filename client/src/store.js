import posts, { postsMiddleware } from './modules/posts'

export default new Vuex.Store({
  modules: {
    posts
  },
  middlewares: [
    postsMiddleware
  ]
})
