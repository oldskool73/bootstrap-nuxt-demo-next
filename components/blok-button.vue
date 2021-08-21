<template>
  <component
    :is="blok.is_inline ? 'span' : 'p'"
    v-editable="blok"
    :class="blok.paragraph_style | implode"
  >
    <link-fragment
      class="btn"
      :class="blok.style | implode"
      :blok="blok.link"
    >
      {{ blok.text }}
    </link-fragment>
  </component>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
