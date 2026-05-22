/**
 * Sanity Schema: Project
 * Drop this into your Sanity Studio /schemas folder.
 * Run `sanity init` first, then add this to schemas/index.js
 */
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Name', type: 'string', validation: (R) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'status', title: 'Status', type: 'string', options: { list: [
      { title: 'Completed', value: 'completed' },
      { title: 'Ongoing', value: 'ongoing' },
    ] }, validation: (R) => R.required() },
    { name: 'sector', title: 'Sector', type: 'string', options: { list: [
      'Industrial', 'Commercial', 'Corporate', 'Logistics', 'Aviation',
      'Aerospace', 'Pharma', 'Biosciences', 'IT', 'R&D'
    ] } },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'area', title: 'Built-up Area (sft)', type: 'number' },
    { name: 'value', title: 'Project Value (₹ Cr)', type: 'number' },
    { name: 'durationMonths', title: 'Duration (months)', type: 'number' },
    { name: 'completionStatus', title: 'Delivery Note', type: 'string', description: 'e.g. "On time"' },
    { name: 'scope', title: 'Scope of Works', type: 'text', rows: 4 },
    { name: 'isTurnkey', title: 'GC Turnkey?', type: 'boolean' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Photo Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'clientName', title: 'Client', type: 'string' },
    { name: 'clientLogo', title: 'Client Logo', type: 'image' },
    { name: 'caseStudy', title: 'Long-form Case Study', type: 'array', of: [{ type: 'block' }] },
    { name: 'testimonial', title: 'Client Quote', type: 'text' },
    { name: 'testimonialAttribution', title: 'Quote Attribution', type: 'string' },
    { name: 'geo', title: 'Geo Coordinates', type: 'geopoint' },
    { name: 'displayOrder', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'heroImage' },
  },
};
