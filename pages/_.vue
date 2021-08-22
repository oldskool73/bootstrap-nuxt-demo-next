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
// const loadData = function({api, cacheVersion, errorCallback, version, path}) {
//   return api.get(`cdn/stories/${path}`, {
//     version,
//     cv: cacheVersion
//   }).then((res) => {
//     return res.data
//   }).catch((res) => {
//     if (!res.response) {
//       // eslint-disable-next-line no-console
//       console.error(res)
//       errorCallback({ statusCode: 404, message: 'Failed to receive content form api' })
//     } else {
//       // eslint-disable-next-line no-console
//       console.error(res.response.data)
//       errorCallback({ statusCode: res.response.status, message: res.response.data })
//     }
//   })
// }

// const getPath = function(path) {
//   return path === '/' ? 'home' : path
// }

export default {

  asyncData (context) {
    if (context.payload) {
      // If we have a pre-generated payload
      return {story: context.payload}
    } else {
      // If not, load the story data from the api
      return context.$storyblokHelpers.loadAsyncStoryData(context)
    }
  },
  data () {
    return { story: { content: {} } }
  },
  mounted () {
    // Load the storyblok bridge for full visual editing functonality
    // (will only be loaded when in the Storyblok editor)
    this.$storyblokHelpers.initStoryblokBridge(this)
  }
}
</script>
