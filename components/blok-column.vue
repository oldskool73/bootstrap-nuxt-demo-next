<template>
  <div v-editable="blok" :class="columnStyle">
    <component
      :is="body.component | dashify"
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    ></component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    columnStyle() {
      let style = this.blok.style.join(' ') + ' '
      style += this.blok?.width?.xsmall ? `col-${this.blok.width.xsmall} ` : ''
      style += this.blok?.width?.small ? `col-sm-${this.blok.width.small} ` : ''
      style += this.blok?.width?.medium ? `col-md-${this.blok.width.medium} ` : ''
      style += this.blok?.width?.large ? `col-lg-${this.blok.width.large} ` : ''
      style += this.blok?.width?.xlarge ? `col-xl-${this.blok.width.xlarge} ` : ''
      return style
    },
  },
}
</script>
