<template>
  <ul v-editable="blok" class="nav" :class="blok.style | implode">
    <component
      :is="body.component | dashify"
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    ></component>
  </ul>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
