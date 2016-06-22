Vue.filter('humanDate', function(value) {
  return moment.utc(value).local().format('MMMM, Do, YYYY H:mm')
})

Vue.filter('fromNow', function(value) {
  return moment.utc(value).local().fromNow()
})

Vue.filter('markdown', function(value) {
  const converter = new showdown.Converter()
  return converter.makeHtml(value)
})
