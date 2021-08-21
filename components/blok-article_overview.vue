<template>
  <section v-editable="blok" class="fdb-block">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1>
            {{ blok.headline }}
          </h1>

          <div v-for="article in articles" :key="article.id" class="card mb-4">
            <img
              v-if="article.content.teaser_image"
              class="card-img-top"
              :src="article.content.teaser_image | resize('500x200')"
              alt="image"
            />

            <div class="card-body">
              <h2 class="card-title">{{ article.name }}</h2>
              <div class="card-text mb-3">
                <markdown :text="article.content.intro"></markdown>
              </div>
              <nuxt-link :to="`/${article.full_slug}`" class="btn btn-primary">
                Read More →
              </nuxt-link>
            </div>
            <div class="card-footer text-muted">
              Posted on {{ article.published_at }}
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <ul class="list-unstyled mb-0">
                <li v-for="category in categories" :key="category.id">
                  <a :href="`?filter=${category.uuid}`">{{ category.name }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="card my-4">
            <h5 class="card-header">Authors</h5>
            <div class="card-body">
              <div
                v-for="author in authors"
                :key="author._uid"
                class="d-flex align-items-center mb-2"
              >
                <div class="mr-2">
                  <img height="30" :src="author.content.image" />
                </div>
                <p>
                  {{ author.content.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      categories: [],
      authors: [],
      articles: [],
    }
  },
  mounted() {
    this.$storyapi
      .get('cdn/stories', {
        starts_with: 'categories/',
        cv: this.$store.state.storyblok.cacheVersion,
      })
      .then((res) => {
        this.categories = res.data.stories
      })
      .catch((res) => {
        // eslint-disable-next-line no-console
        console.error('Failes to load resource', res)
      })

    this.$storyapi
      .get('cdn/stories', {
        starts_with: 'authors/',
        cv: this.$store.state.storyblok.cacheVersion,
      })
      .then((res) => {
        this.authors = res.data.stories
      })
      .catch((res) => {
        // eslint-disable-next-line no-console
        console.error('Failes to load resource', res)
      })

    // TODO: Implement {exists: params.filter}

    this.$storyapi
      .get('cdn/stories', {
        starts_with: 'article/',
        is_startpage: '0',
        cv: this.$store.state.storyblok.cacheVersion,
      })
      .then((res) => {
        this.articles = res.data.stories
      })
      .catch((res) => {
        // eslint-disable-next-line no-console
        console.error('Failes to load resource', res)
      })
  },
}
</script>
