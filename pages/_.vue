<template>
  <div>
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content">
    </component>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {ACTIONS} from '~/store/storyblok'

const loadData = function({api, cacheVersion, errorCallback, version, path}) {
  return api.get(`cdn/stories/${path}`, {
    version,
    cv: cacheVersion
  }).then((res) => {
    return res.data
  }).catch((res) => {
    if (!res.response) {
      // eslint-disable-next-line no-console
      console.error(res)
      errorCallback({ statusCode: 404, message: 'Failed to receive content form api' })
    } else {
      // eslint-disable-next-line no-console
      console.error(res.response.data)
      errorCallback({ statusCode: res.response.status, message: res.response.data })
    }
  })
}
export default {

  asyncData (context) {
    // Check if we are in the editor mode
    let editMode = false

    if (
      context.query._storyblok ||
      context.isDev ||
      (process.client && window.localStorage.getItem('_storyblok_draft_mode'))
    ) {
      if (process.client && window) {
        window.localStorage.setItem('_storyblok_draft_mode', '1')
        if (window.location === window.parent.location) {
          window.localStorage.removeItem('_storyblok_draft_mode')
        }
      }

      editMode = true
    }

    const version = editMode ? 'draft' : 'published'
    const path = context.route.path === '/' ? 'home' : context.route.path

    // Load the JSON from the API
    return loadData({
      version,
      api: context.app.$storyapi,
      cacheVersion: context.store.state.cacheVersion,
      errorCallback: context.error,
      path
    })
  },
  data () {
    return { story: { content: {} } }
  },
  methods: {
    ...mapActions('storyblok', {
      loadSettings: ACTIONS.LOAD_SETTINGS,
      loadCacheVersion: ACTIONS.LOAD_CACHE_VERSION
    })
  },
  mounted () {
    this.loadSettings({version: 'draft'})
    this.loadCacheVersion()
    // this.$storybridge(() => {
    //   const storyblokInstance = new StoryblokBridge()

    //   storyblokInstance.on(['input', 'published', 'change'], (event) => {
    //     if (event.action === 'input') {
    //       if (event.story.id === this.story.id) {
    //         this.story.content = event.story.content
    //       }
    //     } else {
    //       this.$nuxt.$router.go({
    //         path: this.$nuxt.$router.currentRoute,
    //         force: true,
    //       })
    //     }
    //   })
    // }, (error) => {
    //   console.error(error)
    // })
  }
}
</script>
