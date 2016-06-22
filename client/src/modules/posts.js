export default {
  state: {
    loading: false,
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    post: {},
    error: null,
    newPost: {
      title: '',
      body: ''
    }
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
    'posts/FIND_REQUESTED'(state) {
      state.error = null
      state.post = {}
      state.loading = true
    },
    'posts/FIND_SUCCEDED'(state, post) {
      state.post = post
      state.loading = false
    },
    'posts/FIND_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'posts/STORE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/STORE_SUCCEDED'(state, post) {
      state.posts.push(post)
      state.newPost = {
        title: '',
        body: ''
      }
      state.loading = false
    },
    'posts/STORE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'posts/REPLACE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/REPLACE_SUCCEDED'(state, post) {
      const idx = state.posts.findIndex(p => p.id === post.id)
      state.posts[idx] = post
      state.post = {}
      state.loading = false
    },
    'posts/REPLACE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'posts/REMOVE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'posts/REMOVE_SUCCEDED'(state, post) {
      state.posts.$remove(post)
      state.loading = false
    },
    'posts/REMOVE_FAILED'(state, error = 'Something went wrong') {
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
      case 'posts/REPLACE_SUCCEDED':
      case 'posts/REMOVE_SUCCEDED':
        localStorage.setItem('posts', JSON.stringify(posts))
        break
    }
  }
}

export const loading = ({ posts: { loading } }) => loading
export const posts = ({ posts: { posts } }) => posts
export const post = ({ posts: { post } }) => post
export const error = ({ posts: { error } }) => error
export const newPost = ({ posts: { newPost} }) => newPost


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
    dispatch('router/ROUTE_CHANGED', { path: `/posts/${post.id}` })
  }).catch(({ data: { message:error } }) => {
    dispatch('posts/STORE_FAILED', error)
  })
}

export const replace = ({ dispatch }, post) => {
  dispatch('posts/REPLACE_REQUESTED')

  Vue.http.put(`posts/${post.id}`, post).then(({ data:post }) => {
    dispatch('posts/REPLACE_SUCCEDED', post)
    dispatch('router/ROUTE_CHANGED', { path: `/posts/${post.id}` })
  }).catch(({ data: { message:error } }) => {
    dispatch('posts/REPLACE_FAILED', error)
  })
}

export const remove = ({ dispatch }, post) => {
  dispatch('posts/REMOVE_REQUESTED')

  Vue.http.delete(`posts/${post.id}`).then(() => {
    dispatch('posts/REMOVE_SUCCEDED', post)
    dispatch('router/ROUTE_CHANGED', { path: '/blog' })
  }).catch(({ data: { message:error } }) => {
    dispatch('posts/REMOVE_FAILED', error)
  })
}
