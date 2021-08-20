<template>
  <footer v-editable="blok" class="fdb-block" :class="blok.style | glue">
    <div class="container">
      <component
        :is="body.component | dashify"
        v-for="body in blok.body"
        :key="body._uid"
        :blok="body"
      ></component>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
