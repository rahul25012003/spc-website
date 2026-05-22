/**
 * Sanity Studio schema entrypoint.
 *
 * Setup:
 *   1. npm install -g @sanity/cli
 *   2. sanity init  (in this folder — creates project, gets keys)
 *   3. Copy these schema files into sanity/schemas/
 *   4. sanity dev   (run studio locally at localhost:3333)
 *   5. Use GROQ queries to fetch into the static site at build time
 *
 * Free tier: 10K documents, 500K API requests/month — generous for this site.
 */
import project from './project';
import person from './person';
import page from './page';
import siteSettings from './siteSettings';

export const schemaTypes = [project, person, page, siteSettings];
