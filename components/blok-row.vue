<template>
  <div v-editable="blok" class="row" :class="blok.style | implode">
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
}
</script>
