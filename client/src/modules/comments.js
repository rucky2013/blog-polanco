export default {
  state: {
    loading: false,
    comments: [],
    comment: {},
    error: null
  },
  mutations: {
    'comments/FETCH_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'comments/FETCH_SUCCEDED'(state, comments) {
      state.comments = comments
      state.loading = false
    },
    'comments/FETCH_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'comments/FIND_REQUESTED'(state) {
      state.error = null
      state.comment = {}
      state.loading = true
    },
    'comments/FIND_SUCCEDED'(state, comment) {
      state.comment = comment
      state.loading = false
    },
    'comments/FIND_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'comments/STORE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'comments/STORE_SUCCEDED'(state, comment) {
      state.comments.push(comment)
      state.loading = false
    },
    'comments/STORE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'comments/REPLACE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'comments/REPLACE_SUCCEDED'(state, comment) {
      const idx = state.comments.findIndex(c => c.id === comment.id)
      state.comments[idx] = comment
      state.loading = false
    },
    'comments/REPLACE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    },
    'comments/REMOVE_REQUESTED'(state) {
      state.error = null
      state.loading = true
    },
    'comments/REMOVE_SUCCEDED'(state, comment) {
      state.comments.$remove(comment)
      state.loading = false
    },
    'comments/REMOVE_FAILED'(state, error = 'Something went wrong') {
      state.error = error
      state.loading = false
    }
  }
}

export const loading = ({ comments: { loading } }) => loading
export const comments = ({ comments: { comments } }) => comments
export const comment = ({ comments: { comment } }) => comment
export const error = ({ comments: { error } }) => error

export const fetch = ({ dispatch }, postId) => {
  dispatch('comments/FETCH_REQUESTED')

  Vue.http.get(`posts/${postId}/comments`).then(({ data:comments }) => {
    dispatch('comments/FETCH_SUCCEDED', comments)
  }).catch(({ data: { message:error } }) => {
    dispatch('comments/FETCH_FAILED', error)
  })
}

export const find = ({ dispatch }, postId, id) => {
  dispatch('comments/FIND_REQUESTED')

  Vue.http.get(`posts/${postId}/comments/${id}`).then(({ data:comment }) => {
    dispatch('comments/FIND_SUCCEDED', comment)
  }).catch(({ data: { message:error } }) => {
    dispatch('comments/FIND_FAILED', error)
  })
}

export const store = ({ dispatch }, postId, comment) => {
  dispatch('comments/STORE_REQUESTED')

  Vue.http.post(`posts/${postId}/comments`, comment).then(({ data:comment }) => {
    dispatch('comments/STORE_SUCCEDED', comment)
  }).catch(({ data: { message:error } }) => {
    dispatch('comments/STORE_FAILED', error)
  })
}

export const replace = ({ dispatch }, postId, comment) => {
  dispatch('comments/REPLACE_REQUESTED')

  Vue.http.put(`posts/${postId}/comments/${comment.id}`, comment).then(({ data:comment }) => {
    dispatch('comments/REPLACE_SUCCEDED', comment)
    dispatch('router/ROUTE_CHANGED', { path: `/posts/${postId}` })
  }).catch(({ data: { message:error } }) => {
    dispatch('comments/REPLACE_FAILED', error)
  })
}

export const remove = ({ dispatch }, postId, comment) => {
  dispatch('comments/REMOVE_REQUESTED')

  Vue.http.delete(`posts/${postId}/comments/${comment.id}`).then(() => {
    dispatch('comments/REMOVE_SUCCEDED', comment)
    dispatch('router/ROUTE_CHANGED', { path: `/posts/${postId}` })
  }).catch(({ data: { message:error } }) => {
    dispatch('comments/REMOVE_FAILED', error)
  })
}
