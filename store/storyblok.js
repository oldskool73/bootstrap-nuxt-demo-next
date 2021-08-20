export const ACTIONS = {
  LOAD_SETTINGS: 'LOAD_SETTINGS',
  LOAD_CACHE_VERSION: 'LOAD_CACHE_VERSION',
}

export const MUTATIONS = {
  SET_SETTINGS: 'SET_SETTINGS',
  SET_CACHE_VERSION: 'SET_CACHE_VERSION',
}

export const state = () => ({
  cacheVersion: '',
  settings: {
    header: [],
    footer: []
  }
})

export const actions = {
  [ACTIONS.LOAD_SETTINGS]({ commit }, context) {
    return this.$storyapi.get(`cdn/stories/global`, {
      version: context.version
    }).then((res) => {
      commit(MUTATIONS.SET_SETTINGS, res.data.story.content)
    })
  },
  [ACTIONS.LOAD_CACHE_VERSION]({ commit }) {
    return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
      commit(MUTATIONS.SET_CACHE_VERSION, res.data.space.version)
    })
  }
}

export const mutations = {
  [MUTATIONS.SET_SETTINGS](state, settings) {
    state.settings = settings
  },
  [MUTATIONS.SET_CACHE_VERSION](state, version) {
    state.cacheVersion = version
  }
}

