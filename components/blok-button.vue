<template>
  <component
    :is="blok.is_inline ? 'span' : 'p'"
    v-editable="blok"
    :class="blok.paragraph_style | glue"
  >
    <a
      :href="blok.link.cached_url"
      class="btn"
      :class="blok.style | glue"
      target="_blank"
    >
      {{ blok.text }}
    </a>
  </component>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
