<template>
  <div class="page">
    <section class="fdb-block">
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-center col-12">
            <h1>Sorry, something has gone wrong!</h1>
          </div>
          <div class="text-center col-12 mb-5">
            <nuxt-link class="btn" to="/">Return To The Home Page</nuxt-link>
          </div>
          <div class="card">
            <div class="card-header">
              Technical Information
            </div>
            <div class="card-body">
              <h4><strong>Error Message</strong> : {{error.message | implode}}</h4>
              <h4><strong>Error Code</strong> : {{error.statusCode}}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'default',
  props: ['error']
}
</script>
