<template>
  <li v-editable="blok" class="nav-item" :class="{ active: isActive }">
    <nuxt-link class="nav-link" :to="`/${blok.link.cached_url}`">
      <i
        v-if="blok.icon && blok.icon.icon"
        :class="`${blok.icon.type} ${blok.icon.icon}`"
      ></i>

      <img v-if="blok.image" alt="image" :src="blok.image" height="40" />
      {{ blok.name }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    isActive() {
      if (
        typeof window !== 'undefined' &&
        window.location.pathname.includes(this.blok.link.cached_url)
      ) {
        return true
      }
      return false
    },
  },
}
</script>
