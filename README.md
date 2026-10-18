# Travelber

English-language European short-break guides, initially focused on the Netherlands.
Built on 2026-10-18: home, destination hub, guide index, three researched guides, about, privacy, and a real 404 page.

Deployment: GitHub caobiny/travelber.com, branch main; Cloudflare Pages travelber-com, output dist.
Run `npm run build` to generate dist from content/page-*.json and assets.
Run `npm test` for metadata, schema, local link and sitemap checks.
Run `npm run dev` for http://localhost:4173. The browser-check script uses local Chrome and playwright-core.
The root index.html is a generated copy; preview dist, not file:// paths.

Each indexable page has a unique title, description, canonical URL, and JSON-LD.
Published articles have source links and accurate editorial authorship; no ratings or firsthand visits are fabricated.
Real licensed photography and credits are recorded in assets/photo-sources.json. Small variants use the same photo/licence.
No affiliate tracking, analytics, newsletter collection or marketing cookies are enabled.

Launch follow-up: verify ownership in Google Search Console and Bing Webmaster Tools, then submit https://travelber.com/sitemap.xml.
This requires the owner's account access; no verification tokens have been invented or committed.
Indexing and ranking are not guaranteed. Review policy/operator details and consent requirements before adding monetisation.
Only completed pages are indexed. Privacy and 404 are noindex. New countries require researched content, not empty templates.

Recovery: Git commit 990cf0e0318105f3231f52b24b5cd7774676b4ad and local ignored .codex/backups.
Do not publish backups or credentials.
