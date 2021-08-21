<template>
  <li v-editable="blok" class="nav-item" :class="{ active: isActive }">
    <link-fragment :blok="blok.link" class="nav-link">
      <i
        v-if="blok.icon && blok.icon.icon"
        :class="`${blok.icon.type} ${blok.icon.icon}`"
      ></i>

      <img v-if="blok.image" alt="image" :src="blok.image" height="40" />
      {{ blok.name }}
    </link-fragment>
  </li>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    isActive() {
      return this.$route.path.includes(this.blok.link.cached_url)
    },
  },
}
</script>
