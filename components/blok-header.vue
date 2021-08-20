<template>
  <header v-editable="blok" :class="blok.style | glue">
    <div class="container" :class="blok.container_style | glue">
      <nav class="navbar" :class="blok.navbar_style | glue">
        <nuxt-link
          v-if="blok.logo"
          :class="blok.logo_style | glue"
          :to="`/${blok.logo_link.cached_url}`"
        >
          <img :src="blok.logo" :height="blok.logo_height" alt="Logo" />
        </nuxt-link>

        <button
          v-if="!blok.hide_navi"
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          :data-target="`#navbar-${blok._uid}`"
          :aria-controls="`navbar-${blok._uid}`"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          v-if="!blok.hide_navi"
          :id="`navbar-${blok._uid}`"
          class="collapse navbar-collapse"
        >
          <ul
            v-if="blok.nav_links && blok.nav_links.length"
            class="navbar-nav"
            :class="blok.main_nav_style | glue"
          >
            <component
              :is="link.component | dashify"
              v-for="link in blok.nav_links"
              :key="link._uid"
              :blok="link"
            ></component>
          </ul>

          <ul
            v-if="blok.second_nav_links && blok.second_nav_links.length"
            class="navbar-nav justify-content-end d-none d-lg-flex ml-md-auto"
          >
            <component
              :is="link.component | dashify"
              v-for="link in blok.second_nav_links"
              :key="link._uid"
              :blok="link"
            ></component>
          </ul>

          <a
            v-if="blok.button_text"
            class="btn btn-empty ml-md-3"
            :href="blok.button_link.cached_url"
          >
            {{ blok.button_text }}
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
