export default {
  state: {
    loading: false,
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    post: {},
    error: null
  },

  mutations: {
    'posts/FETCH_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/FETCH_SUCCEDED'(state, posts) {
      state.posts = posts
      state.loading = false
    },

    'posts/FETCH_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'posts/STORE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/STORE_SUCCEDED'(state, post) {
      state.posts.push(post)
      state.loading = false
    },
    'posts/STORE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'posts/FIND_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/FIND_SUCCEDED'(state, post) {
      state.post = post
      state.loading = false
    },
    'posts/FIND_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    }
  }
}

export const postsMiddleware = {
  onMutation: ({ type }, { posts: { posts } }) => {
    switch(type) {
      case 'posts/FETCH_SUCCEDED':
      case 'posts/STORE_SUCCEDED':
        localStorage.setItem('posts', JSON.stringify(posts))
        break
    }
  }
}

export const loading = ({ posts: { loading } }) => loading
export const posts = ({ posts: { posts } }) => posts
export const post = ({ posts: { post } }) => post
export const error = ({ posts: { error } }) => error


export const fetch = ({ dispatch }) => {
  dispatch('posts/FETCH_REQUESTED')

  Vue.http.get('posts').then(({ data:posts }) => {
    dispatch('posts/FETCH_SUCCEDED', posts)
  }).catch(({ data: { message:error } }) => {
    dispatch('posts/FETCH_FAILED', error)
  })
}

export const find = ({ dispatch, state }, id) => {
  dispatch('posts/FIND_REQUESTED')

  const foundPost = state.posts.posts.find(p => p.id === id)

  if(foundPost)
    dispatch('posts/FIND_SUCCEDED', foundPost)
  else {
    Vue.http.get('posts/' + id).then(({ data:post }) => {
      dispatch('posts/FIND_SUCCEDED', post)
    }).catch(({ data: { message:error } }) => {
      dispatch('posts/FIND_FAILED', error)
    })
  }
}

export const store = ({ dispatch }, post) => {
  dispatch('posts/STORE_REQUESTED')

  Vue.http.post('posts', post).then(({ data:post }) => {
    dispatch('posts/STORE_SUCCEDED', post)
    dispatch('router/ROUTE_CHANGED', { path: '/posts/' + post.id })
  }).catch(({ data: { message:error } }) => {
    dispatch('posts/STORE_FAILED', error)
  })
}
