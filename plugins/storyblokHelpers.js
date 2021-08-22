import Vue from 'vue'

/**
 * Remap where the data for a route will be loaded from
 * @param {string} path
 * @returns {string} remapped path
 */
const getStoryPath = function(path) {
  return path === '/' ? 'home' : path
}

/**
 * Load story data from the API endpoint
 *
 * @param {Object} param0 Loading params object
 * @returns {Promise} Promise resolved
 */
const loadStoryData = function({api, path, version, cacheVersion, errorCallback }) {
  return api.get(`cdn/stories/${path}`, {
    version,
    cv: cacheVersion
  }).then((res) => {
    return res.data
  }).catch((res) => {
    if (!res.response) {
      // eslint-disable-next-line no-console
      console.error(res)
      errorCallback({ statusCode: 404, message: 'Failed to receive content from Storyblok api' })
    } else {
      // eslint-disable-next-line no-console
      console.error(res.response.data)
      errorCallback({ statusCode: res.response.status, message: res.response.data })
    }
  })
}

/**
 *
 * @param {Object} context Context Object
 * @returns {Promise}
 */
const loadAsyncStoryData = function(context) {
  let editMode = false

  // Check if we are in the editor mode, or on dev
  if (
    context.query._storyblok ||
    context.isDev ||
    (process.client && window.localStorage.getItem('_storyblok_draft_mode'))
  ) {
    if (process.client && window) {
      // set or remove a token if we are in the editor iframe
      if (window.location === window.parent.location) {
        window.localStorage.removeItem('_storyblok_draft_mode')
      } else {
        window.localStorage.setItem('_storyblok_draft_mode', '1')
      }
    }

    editMode = true
  }

  // Load the JSON from the API
  return loadStoryData({
    version: editMode ? 'draft' : 'published',
    api: context.app.$storyapi,
    cacheVersion: context.store.state.storyblok.cacheVersion,
    errorCallback: context.error,
    path: getStoryPath(context.route.path)
  })
}

const initStoryblokBridge = function(context) {
  if (window.location.search.includes('_storyblok') && context.$storybridge) {
    context.$storybridge(() => {
      const { StoryblokBridge } = window
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input'], (event) => {
        // console.debug(event)
        if (event.story.id === context.story.id) {
          context.story.content = event.story.content
        }
      })
      storyblokInstance.on(['published', 'change'], (event) => {
        // console.debug(event)
        if (!event.slugChanged) {
          context.$nuxt.$router.go({
            path: context.$nuxt.$router.currentRoute,
            force: true,
          })
        }
      })
      storyblokInstance.on('enterEditmode', (event) => {
        // console.debug(event)
        loadStoryData({
          version: 'draft',
          api: context.$storyapi,
          cacheVersion: null,
          errorCallback: (error) => {
            // eslint-disable-next-line no-console
            console.error(error)
          },
          path: getStoryPath(context.$route.path)
        }).then(res => {
          // This is ugly and causes a flash :(
          // but seems to be the only way to trigger the edit mode update
          // using Vue.set or Object.spread doesn't seem to work
          context.story = { content: {} }
          Vue.nextTick(() => {
            context.story = res.story
          })
        })
      })
    }, (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  }
}

export default ({ app }, inject) => {
  inject('storyblokHelpers', {
    loadStoryData,
    loadAsyncStoryData,
    initStoryblokBridge
  })
}
