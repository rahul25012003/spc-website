/**
 * Sanity Schema: Site Settings (singleton — header/footer config, contact, etc.)
 */
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'companyName', title: 'Company Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'address', title: 'Head Office Address', type: 'text', rows: 3 },
    { name: 'landline', title: 'Landline', type: 'string' },
    { name: 'generalEmail', title: 'General Email', type: 'string' },
    { name: 'mdEmail', title: 'MD Email', type: 'string' },
    { name: 'mdPhone', title: 'MD Phone', type: 'string' },
    { name: 'gmEmail', title: 'GM Email', type: 'string' },
    { name: 'gmPhone', title: 'GM Phone', type: 'string' },
    { name: 'cin', title: 'CIN', type: 'string' },
    { name: 'gstin', title: 'GSTIN', type: 'string' },
    { name: 'pan', title: 'PAN', type: 'string' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'whatsappNumber', title: 'WhatsApp (with country code)', type: 'string' },
    { name: 'ga4Id', title: 'Google Analytics 4 ID', type: 'string' },
    { name: 'clarityId', title: 'Microsoft Clarity ID', type: 'string' },
  ],
};
