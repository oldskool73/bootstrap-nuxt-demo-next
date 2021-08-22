import Vue from 'vue'
import {ACTIONS as STORYBLOK_ACTIONS} from '~/store/storyblok'

export default async function ({ route, store, isDev }) {
  // Force version if in dev or the content editor.
  // TODO: validate this better, see
  // https://www.storyblok.com/docs/Guides/storyblok-latest-js#how-to-validate-if-the-user-is-viewing-your-site-in-the-storyblo
  const version = route.query._storyblok || isDev ? 'draft' : 'published'

  // Not used?
  // const language = route.params.language || 'en'

  // Not sure if this works?
  // Should allow us to use a different token, if sent on the Window,
  // But not sure where this is supposed to come from?
  // Storyblok editor does NOT seem to set this on previews?
  if (typeof window !== 'undefined' && window.StoryblokToken) {
    Vue.prototype.$storyapi.accessToken = window.StoryblokToken
  }

  // Load the current cache version to the store
  if (!store.state.storyblok.cacheVersion) {
    await store.dispatch(`storyblok/${STORYBLOK_ACTIONS.LOAD_CACHE_VERSION}`)
  }

  // Load the current 'settings' to the store
  // (this loads the 'common' content we will need for every page)
  if (!store.state.storyblok.settings._uid) {
    await store.dispatch(`storyblok/${STORYBLOK_ACTIONS.LOAD_SETTINGS}`, {version})
  }
}
