<template>
  <span>
    <nuxt-link v-if="linkType==='story'" :to="`/${cachedUrl}`">
      <slot />
    </nuxt-link>
    <a v-else :href="cachedUrl" target="_blank">
      <slot />
    </a>
  </span>
</template>

<script>
/**
 * Wrapper to handle Storyblok links
 * which may be either 'internal' (using `nuxt-link` tag)
 * or external (using a standard `a` tag)
 */
export default {
  props: ['blok'],
  computed: {
    cachedUrl() {
      return this?.blok?.cached_url || '';
    },
    linkType() {
      return this?.blok?.linktype || ''
    }
  },
}
</script>
