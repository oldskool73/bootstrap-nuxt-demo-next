import Vue from 'vue'

Vue.filter('resize', (image, size) => {
  if (typeof image !== 'undefined') {
    return '//img2.storyblok.com/' + size + image.replace('//a.storyblok.com', '')
  }
  return null
})

Vue.filter('dashify', function (value) {
  if (typeof value === 'undefined') {
    return 'undefined'
  }
  const dashified = value.toString()
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
    .replace(/[ _]/g, '-')

  return 'blok-' + dashified
})

/**
 * Implode an array of strings into a single string, joined by 'separator'
 * Used for styles etc.
 */
Vue.filter('implode', (value = '', separator = ' ') => {
  if (!Array.isArray(value)) return value
  return value.join(separator)
})
