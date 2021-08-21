<template>
  <span>
    <nuxt-link v-if="linkType==='story'" :to="`/${blok.cached_url}`">
      <slot />
    </nuxt-link>
    <a v-else :href="blok.cached_url" target="_blank">
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
    linkType() {
      return this.blok?.linktype
    }
  },
}
</script>
