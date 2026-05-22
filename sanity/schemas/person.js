/**
 * Sanity Schema: Person (Leadership / Team)
 */
export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string', validation: (R) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'role', title: 'Role / Title', type: 'string' },
    { name: 'roleShort', title: 'Short Title (display)', type: 'string' },
    { name: 'yearsExperience', title: 'Years of Experience', type: 'number' },
    { name: 'photo', title: 'Headshot', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Biography', type: 'text', rows: 5 },
    { name: 'credentials', title: 'Credentials / Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'displayOrder', title: 'Display Order', type: 'number' },
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
};
