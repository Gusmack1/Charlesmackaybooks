Enhanced Blog Editions – Work Plan

Definition of Done for each post
- 3,000+ words, research-backed, no speculation
- BBC-style structure: hero lead, sections, sub-sections, smooth transitions
- At least 4 inline images with captions (public/blog-images/*), or default-generic.svg where needed
- Technical specifications, pilot testimony, comparisons, modern legacy
- Links to relevant books and related posts
- Pass build locally and deploy via Netlify

Queue (start → finish)
- [x] beardmore-aviation-scottish-industrial-giant
- [x] percy-pilcher-scotland-aviation-pioneer
- [x] hms-argus-first-aircraft-carrier
- [x] hawker-hurricane-fighter-development
- [x] clydeside-aviation-revolution
- [x] british-aircraft-great-war-rfc-rnas
- [x] german-aircraft-great-war-development
- [x] english-electric-lightning-development
- [x] f86-sabre-cold-war-fighter
- [x] jet-age-aviation-cold-war-development
- [x] schneider-trophy-racing-development
- [x] lucy-lady-houston-schneider-trophy
- [x] luftwaffe-1945-final-year
- [x] me262-jet-fighter-revolution
- [ ] naval-aviation-history
 - [x] naval-aviation-history
- [x] bristol-fighter-f2b-brisfit
- [x] bristol-sycamore-helicopter-development
 - [ ] helicopter-development-pioneers
- [x] sikorsky-vs300-helicopter-breakthrough
- [x] sopwith-camel-wwi-fighter
- [x] supermarine-spitfire-development-history
- [x] supermarine-spitfire-development-evolution
- [x] sycamore-seeds-helicopter-evolution
- [x] test-pilot-biography-eric-brown
- [x] aviation-manufacturing-wartime-production
- [x] korean-war-air-combat

Notes
- As images were cleaned in public/blog-images, use `default-generic.svg` if a period-appropriate replacement is not yet sourced. Replace with licensed historical images as they are added.
- Each edit will update the `post.content` HTML in the route file under `src/app/blog/<slug>/page.tsx`.

Immediate cleanup follow-up (blog UI)
- Remove residual metadata badges on all blog hero sections (author/date/reading time/Research-backed) – implemented via shared templates cleanup.
- Condense hero section vertical padding across blog templates and blog index – implemented.
- Simplify blog index cards: removed date/read-time/tags row and bottom author section – implemented.
- Verify individual blog route files do not hardcode removed metadata in local markup – spot check complete; continue checking during future edits.

