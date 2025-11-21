# Scottish & UK Aviation News Sources

| Source | Type / Coverage | Access Method | Licensing / Usage Notes | Implementation Notes |
| --- | --- | --- | --- | --- |
| Royal Air Force (raf.mod.uk) | Official RAF operations, basing, exercises | RSS: `https://www.raf.mod.uk/news/articles/feed/` | Crown copyright & Open Government Licence (OGL) v3.0 for text; images typically MOD Crown copyright – must include credit “© UK MOD Crown Copyright”. | Safe for daily summaries; store source URL + publish date; log image reference number from Defence Imagery. |
| Ministry of Defence Press Office (gov.uk/mod) | UK defence procurement, capability news | RSS: `https://www.gov.uk/government/organisations/ministry-of-defence.atom` | Text under OGL v3.0 unless otherwise noted; photos may require credit lines. | Filter for aviation keywords (RAF, Fleet Air Arm, aerospace industry). |
| Department for Transport (DfT) | Aviation policy, PSO funding, airport regulations | Atom: https://www.gov.uk/government/organisations/department-for-transport.atom | OGL v3.0; standard Crown copyright | Auto-ingest as secondary source; surface Scottish route and funding updates alongside book CTAs. |
| Air Accidents Investigation Branch (AAIB) | Safety bulletins and investigation reports | Atom: https://www.gov.uk/government/organisations/air-accidents-investigation-branch.atom | OGL v3.0; cite AAIB bulletin title/reference | Flag drafts for editorial double-check; emphasise safety lessons in technical volumes. |
| UK Defence Journal | Independent defence reporting, often Scotland-focused | RSS available per category | Copyrighted journalism; require permission or use short attributed summaries (<75 words) linking to original. | Treat as secondary source; store headline + URL, summarise with clear attribution “UK Defence Journal reported…”. |
| BBC Scotland / BBC Defence | National coverage of Scottish aerospace, air bases | No public RSS for sections; use BBC News Labs API (requires key) or manual curation | Strict copyright; only paraphrased summaries with citation “BBC reported”. No image reuse. | Use for context rather than primary ingestion until licence secured. |
| The Scotsman (transport/aviation) | Regional developments (airports, manufacturers) | RSS: `https://www.scotsman.com/api/feed/incoming` (requires key) | Copyrighted; require licence or limit to attributed summaries. | Potential partner for cross-links; treat as secondary until licensing arranged. |
| Press & Journal (Aberdeen) | Highlands, RAF Lossiemouth, Wick, Shetland | Paywalled; no direct RSS without subscription | Copyrighted; need syndication agreement for regular use. | Add to “manual review” list for editors. |
| Highlands and Islands Airports Ltd (HIAL) | Operational updates for regional airports | Public newsroom HTML listings (no RSS) parsed by our scraper | Corporate releases—usually usable with attribution; check each page’s terms (typically © HIAL). | Parser captures .listing__heading, summary, and date so each brief can drive regional book CTAs. |
| Glasgow Prestwick Airport | Cargo & maintenance hub announcements | News page RSS (`/news/feed/`) | © Glasgow Prestwick; reuse permitted with attribution (per site terms). | Tie to Beardmore/Prestwick book catalogue for relevance. |
| Spirit AeroSystems (Prestwick) | Manufacturing contracts, workforce updates | Press releases via newsroom; email alerts available | Corporate copyright; reuse allowed with attribution; images may have Getty/press restrictions. | Capture procurement data for technical context (wing structures, employment). |
| Babcock International (Fleet Support) | Scottish naval aviation MRO, helicopters | Press release RSS available | Corporate copyright; reuse with attribution | Useful for helicopter development tie-ins (Sycamore, Weir heritage). |
| National Museums Scotland | Exhibitions, archival digitisation | Newsroom feed; often uses OGL for text | OGL for text, image-specific credits | Aligns with heritage storytelling; highlight museum collaboration. |
| Imperial War Museums / RAF Museum | National exhibitions, archival releases | RSS + APIs | Typically © IWM/RAFM; images require licence or use CC releases | Use cautiously; ensure rights cleared before embedding imagery. |
| Civil Aviation Authority (CAA) | Regulatory updates, airspace changes | RSS: `https://www.caa.co.uk/News/News-RSS/` | © CAA; text usually available under OGL-like terms; confirm per press release | Good for technical regulatory context; limited imagery. |
| FlightGlobal / Cirium | Industry analysis, order books, programmes | Paid API / RSS for subscribers | Strict copyright; need subscription & republishing agreement | Use for data referencing (“According to FlightGlobal…”) without quoting extensively. |
| Janes Defence | Military intelligence & specs | Subscription API | Strict copyright | Use only for background research; no direct extracts. |
| UK Parliament Committees (Defence, Transport) | Reports, transcripts | RSS per committee; Hansard API for statements | Open Parliament Licence (based on OGL) with attribution | Great for citing official evidence; include report title/HC number. |
| Scottish Government (Transport & Net Zero) | Aviation policy, infrastructure funding | RSS via `https://www.gov.scot/news/feed/` | OGL v3.0 | Important for regional funding/airport upgrades; pair with analysis. |
| Transport Scotland | Infrastructure projects (runways, access) | RSS on site | OGL v3.0 | Link to modernisation content, emphasise archival comparisons. |
| National Museum of Flight (East Fortune) | Exhibition launches, restoration projects | News blog RSS | © National Museums Scotland (OGL for text, image credit required) | Primary heritage source for Scottish aviation artefacts; tie to historic book chapters. |
| Loganair Newsroom | Regional airline fleet, route announcements | `https://www.loganair.co.uk/media-centre/` (JSON feed per page) | Corporate copyright; PR content reusable with attribution | Ideal for civil aviation updates linked to Scottish routes. |
| Highlands and Islands Enterprise (HIE) | Aerospace investment, spaceport funding | RSS: `https://www.hie.co.uk/feed.xml` | OGL-style terms; confirm per release | Covers Prestwick Spaceport, SaxaVord, UAV test ranges. |
| SaxaVord Spaceport | Shetland-based launch site updates | News page RSS | Corporate copyright; imagery often © SaxaVord / partners | Space/rocket stories relevant to modern Scottish aerospace. |
| Prestwick Spaceport / South Ayrshire Council | Spaceflight, MRO, innovation hub | Council news RSS (OGL) + dedicated press releases | OGL for council text; partner imagery may need approval | Connects to Beardmore/Prestwick heritage narratives. |
| Spirit AeroSystems (Prestwick) | Wing production, workforce news | Email/RSS alerts | Corporate copyright; reuse with attribution | Technical manufacturing insights for book tie-ins. |
| Rolls-Royce UK (Inchinnan) | Engine MRO, heritage anniversaries | Press releases RSS | Corporate copyright | Provide technical specs on engines mentioned in books. |
| ADS Scotland / Scottish Aerospace, Defence & Security | Industry stats, policy briefings | Newsletter/RSS for members | Copyrighted; obtain permission | Useful for contextual data/quotes; cite as “ADS Scotland briefing”. |
| Royal Aeronautical Society (RAeS) – Highland & Glasgow branches | Lecture notices, research papers | Branch blogs/newsletters | RAeS copyright; summarise with attribution | Add expert commentary or references to archival lectures. |
| Glasgow City Archives & University of Glasgow Archives | Newly digitised Beardmore, Weir, Beardmore files | Blog/news updates | OGL/Archive-specific terms; images require credit | Vital for historical primary sources supporting book content. |
| Strathallan Air Museum (Dumfries & Galloway Aviation Museum) | Restoration diaries, collection news | Blog + Facebook RSS (can ingest via page feed) | Museum copyright; request permission for photos | Great for WWII/Cold War aircraft restoration stories. |
| Shetland News | Civil/military aviation in Shetland (Sumburgh, SaxaVord) | RSS: `https://www.shetnews.co.uk/feed/` | Copyrighted journalism; summarise with attribution | Use for local operational context; limit quotes. |
| Orkney News | Kirkwall airport, Loganair, UAV testing | RSS: `https://theorkneynews.scot/feed/` | Creative Commons Attribution-ShareAlike | Friendly licensing—retain CC BY-SA notice. |
| Press & Journal (Inverness/Highlands) | RAF Lossiemouth, Moray aerospace | Subscription API | Copyrighted | Mark as “manual review” for editors when deeper local insight needed. |
| Skyrora / Orbex (Scottish launch firms) | Rocket development milestones | Press releases | Corporate copyright | Provides modern aerospace/spaceflight tie-ins; emphasise Scottish innovation. |
| University of Strathclyde / AFRC | Advanced Forming Research Centre, aerospace manufacturing | Newsroom RSS | University copyright; usually re-usable with attribution | Adds engineering depth for jet age discussions. |
| National Records of Scotland | Newly released wartime records | News blog / OGL | OGL v3.0 | Key for WWII archival references—log reference numbers in citations. |

## Classification
- **Primary (auto-ingest)**: RAF, MOD, Scottish/UK government departments, CAA, HIAL, Glasgow Prestwick, Spirit AeroSystems, Babcock, National Museums Scotland.
- **Secondary (editorial review needed)**: BBC, The Scotsman, Press & Journal, UK Defence Journal, FlightGlobal, Janes. Use summaries with explicit attribution; secure licensing for frequent reuse.
- **Archival/Contextual**: Museums, Parliament, IWM/RAFM—use for background features; ensure image rights before embedding.

## Required Metadata per Story
1. Source name + URL
2. Publication date/time (UTC)
3. Licence category (OGL, Corporate, Restricted)
4. Image asset IDs / credits
5. Suggested internal tag(s): e.g., `RAF Lossiemouth`, `Helicopters`, `WWII Heritage`
6. Linked book slug(s) for contextual CTA

## Next Actions
- Confirm licensing status for BBC/Scotsman (contact commercial teams for syndication terms).
- Set up automated fetchers for all primary sources; log HTTP status & ETag for dedupe.
- Build reviewer checklist referencing this table before any post auto-publishes.

