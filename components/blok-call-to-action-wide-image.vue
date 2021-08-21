<template>
  <section v-editable="blok" class="fdb-block pb-0">
    <div class="container">
      <div class="row align-items-center text-left">
        <div class="col-12 col-md-8">
          <h1>{{ blok.headline }}</h1>
          <p class="text-h3">
            {{ blok.text }}
          </p>
        </div>
        <div class="col-12 col-md-3 ml-auto text-left text-md-right">
          <component
            :is="button.component | dashify"
            v-for="button in blok.buttons"
            :key="button._uid"
            :blok="button"
          ></component>
        </div>
      </div>

      <div v-if="blok.image" class="row pt-5">
        <div class="col-12">
          <img alt="image" class="img-fluid" :src="blok.image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
