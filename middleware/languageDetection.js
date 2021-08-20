import Vue from 'vue'
import {ACTIONS as STORYBLOK_ACTIONS} from '~/store/storyblok'

export default async function ({ app, route, store, isDev }) {
  const version = route.query._storyblok || isDev ? 'draft' : 'published'
  // const language = route.params.language || 'en'

  if (typeof window !== 'undefined' && window.StoryblokToken) {
    Vue.prototype.$storyapi.accessToken = window.StoryblokToken
  }

  if (!store.state.storyblok.cacheVersion) {
    await store.dispatch(`storyblok/${STORYBLOK_ACTIONS.LOAD_CACHE_VERSION}`)
  }

  if (!store.state.storyblok.settings._uid) {
    await store.dispatch(`storyblok/${STORYBLOK_ACTIONS.LOAD_SETTINGS}`, {version})
  }
}
