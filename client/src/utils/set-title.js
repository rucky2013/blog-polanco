export default (title, suffix = 'Blog Polanco') => {
  document.title = title ? `${title} | ${suffix}` : suffix
}
