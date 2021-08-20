<template>
  <section v-editable="blok" class="fdb-block">
    <div class="container">
      <div class="row align-items-center">
        <div v-if="blok.style == 'right'" class="col-12 col-sm-3 text-center">
          <a class="btn" :href="blok.button_link.cached_url">
            {{ blok.button_text }}
          </a>
        </div>
        <div
          v-if="blok.style == 'right'"
          class="col-12 col-sm-9 text-center text-sm-right mt-4 mt-sm-0"
        >
          <h2>{{ blok.headline }}</h2>
        </div>
        <div v-if="blok.style != 'right'" class="col-12 col-sm-9 text-left">
          <h2>{{ blok.headline }}</h2>
        </div>
        <div
          v-if="blok.style != 'right'"
          class="col-12 col-sm-3 text-left text-sm-center mt-4 mt-sm-0"
        >
          <a class="btn" :href="blok.button_link.cached_url">
            {{ blok.button_text }}
          </a>
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
