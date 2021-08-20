<template>
  <div class="body__wrap">
    <div class="body__other">
      <div
        v-if="!$store.state.storyblok.settings.header.length"
        v-editable="$store.state.storyblok.settings"
      >
        Define header blocks here
      </div>
      <component
        :is="blok.component | dashify"
        v-for="blok in $store.state.storyblok.settings.header"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </div>
    <main id="main" role="main" class="body__content">
      <nuxt/>
    </main>
    <div class="body__other">
      <div
        v-if="!$store.state.storyblok.settings.footer.length"
        v-editable="$store.state.storyblok.settings"
      >
        Define footer blocks here
      </div>
      <component
        :is="blok.component | dashify"
        v-for="blok in $store.state.storyblok.settings.footer"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </div>
  </div>
</template>
