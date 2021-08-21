<template>
  <div v-editable="blok" :class="blok.style | implode" v-html="markdownText"></div>
</template>

<script>
import marked from 'marked'

export default {
  props: ['blok'],
  computed: {
    markdownText() {
      return marked(this.blok.text)
    },
  },
}
</script>
