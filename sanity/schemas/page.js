/**
 * Sanity Schema: Page (for static content blocks — About, Vision, Mission, Contact, etc.)
 */
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: (R) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' },
    { name: 'heroHeading', title: 'Hero Heading', type: 'string' },
    { name: 'heroSubhead', title: 'Hero Sub-heading', type: 'text' },
    { name: 'heroImage', title: 'Hero Image', type: 'image' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
    { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
  ],
};
