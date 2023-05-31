import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function get() {
  return rss({
    title: "Matt Bishop's | Blog",
    description: 'My journey learning Astro',
    site: 'https://matt-bp.github.io',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`
  })
}
