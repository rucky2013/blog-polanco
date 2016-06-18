import HomePage from './pages/home'
import PostsIndexPage from './pages/posts/index'
import PostsShowPage from './pages/posts/show'
import PostsCreatePage from './pages/posts/create'
import PostsEditPage from './pages/posts/edit'
import AboutPage from './pages/about'
import NotFoundPage from './pages/not-found'
import setTitle from './utils/set-title'

const router = new VueRouter({
  history: true,
  linkActiveClass: 'active',
  saveScrollPosition: true
})

router.map({
  '/': {
    name: 'home',
    component: HomePage
  },
  '/about': {
    name: 'about',
    title: 'About',
    component: AboutPage
  },
  '/blog': {
    name: 'posts.index',
    title: 'Blog',
    component: PostsIndexPage
  },
  '/posts/:id': {
    name: 'posts.show',
    component: PostsShowPage
  },
  '/posts/create': {
    name: 'posts.create',
    title: 'Create Post',
    component: PostsCreatePage
  },
  '/posts/:id/edit': {
    name: 'posts.edit',
    title: 'Edit Post',
    component: PostsEditPage
  },
  '*': {
    title: 'Not Found',
    component: NotFoundPage
  }
})

router.afterEach(({ to: { title } }) => setTitle(title))

export default router
