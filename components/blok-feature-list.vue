<template>
  <div v-editable="blok" class="row text-center justify-content-center pt-5">
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
