// Redirect the `/home` route to `/`
// This is required as you can't have an un-named page as the root page
// ...although `real-path` may work?? https://forum.storyblok.com/t/help-with-index-page-and-static-rendering-nuxt/224
// (If you don't care about having `/home` as the URL, this is not needed)
export default function ({ $storyblokHelpers, route, redirect }) {
  const pathMapped = (route.path === '/home') ? '/' : route.path
  if (pathMapped !== route.path) {
    return redirect(pathMapped)
  }
}
