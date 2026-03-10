# Missing Blog Images

Referenced JPGs that do not exist in `public/blog-images/`. Either add the image files or migrate to `BlogImage` component for automatic fallback.

## Existing JPGs (7)

- `women-aircraft-workers.jpg`
- `mig15-sabre-opponent.jpg`
- `fw190-d9-luftwaffe-1945.jpg`
- `do335-pfeil-experimental-fighter.jpg`
- `chuck-yeager-sabre-pilot.jpg`
- `beardmore-aviation-factory.jpg`
- `aircraft-production-statistics.jpg`

## Referenced but Missing

| Image | Used In |
|-------|---------|
| `bristol-sycamore.jpg` | rotorcraft-military-applications, sycamore-seeds-helicopter-evolution |
| `sikorsky-vs300-helicopter-breakthrough.jpg` | rotorcraft-military-applications |
| `eric-brown-official-portrait.jpg` | test-pilot-biography-eric-brown, hawker-hurricane-fighter-development |
| `eric-brown-seafire-carrier.jpg` | test-pilot-biography-eric-brown |
| `supermarine-s6b-schneider-trophy.jpg` | lucy-lady-houston-schneider-trophy, golden-age-1918-1939 |
| `spitfire-prototype-k5054-historical.jpg` | lucy-lady-houston-schneider-trophy, supermarine-spitfire-development-history |
| `beardmore-parkhead-forge.jpg` | scottish-aviation-between-the-wars, hms-argus-first-aircraft-carrier, beardmore-aviation-scottish-industrial-giant, clydeside-aviation-revolution |
| `percy-pilcher-hawk-glider-scotland.jpg` | percy-pilcher-scottish-aviation-pioneer |
| `percy-pilcher-hawk-glider.jpg` | pioneer-era-1895-1914 |
| `hms-argus-aircraft-carrier.jpg` | naval-aviation-history |
| `me262-jet-fighter-historical.jpg` | me262-jet-fighter-revolution, luftwaffe-1945-final-year, korean-war-air-combat |
| `hawker-hurricane-battle-of-britain.jpg` | hawker-hurricane-fighter-development, supermarine-spitfire-development-evolution, supermarine-spitfire-development-history |
| `hurricane-development-workshop.jpg` | hawker-hurricane-fighter-development |
| `hurricane-r4118-flight.jpg` | hawker-hurricane-fighter-development |
| `hawker-hurricane-formation-flight.jpg` | hawker-hurricane-fighter-development |
| `hawker-hurricane-professional.jpg` | hawker-hurricane-fighter-development |
| `supermarine-spitfire-development.jpg` | hawker-hurricane-fighter-development |
| `supermarine-spitfire-development-evolution.jpg` | hawker-hurricane-fighter-development |
| `bristol-fighter-f2b-flying.jpg` | bristol-fighter-f2b-brisfit, british-aircraft-great-war-rfc-rnas, german-aircraft-great-war-development |
| `bristol-fighter-technical-side.jpg` | bristol-fighter-f2b-brisfit |
| `bristol-fighter-ground.jpg` | bristol-fighter-f2b-brisfit |
| `bristol-f2b-fighter-replica.jpg` | bristol-fighter-f2b-brisfit |
| `metal-aircraft-construction.jpg` | adolf-rohrbach-metal-aircraft-revolution, adolf-rohrbach-metal-aircraft-construction |
| `curtiss-nc4-flying-boat.jpg` | adolf-rohrbach-metal-aircraft-revolution, adolf-rohrbach-metal-aircraft-construction |
| `rfc-pilots-no32-squadron-1916.jpg` | british-aircraft-great-war-rfc-rnas, clydeside-aviation-revolution |
| `aircraft-factory-assembly-line.jpg` | british-aircraft-great-war-rfc-rnas, adolf-rohrbach-metal-aircraft-revolution |
| `se5a-royal-aircraft-factory.jpg` | british-aircraft-great-war-rfc-rnas |
| `vickers-valiant-bomber.jpg` | british-nuclear-deterrent-v-force |
| `handley-page-victor-bomber.jpg` | british-nuclear-deterrent-v-force |
| `charles-mackay-chipmunk-wp808-turnhouse-1971.jpg` | de-havilland-chipmunk-wp808-turnhouse |
| `de-havilland-chipmunk-formation.jpg` | de-havilland-chipmunk-wp808-turnhouse |
| `de-havilland-chipmunk-cockpit.jpg` | de-havilland-chipmunk-wp808-turnhouse |
| `spitfire-k5054-prototype.jpg` | supermarine-spitfire-development-evolution, supermarine-spitfire-development-history |
| `sopwith-camel-historical-1918.jpg` | british-aircraft-great-war-rfc-rnas, bristol-fighter-f2b-brisfit, great-war-1914-1918 |
| Plus others | Various blog posts, category pages |

## Migration

Replace `<img src="/blog-images/foo.jpg" ... />` with:

```tsx
import BlogImage from '@/components/BlogImage';

<BlogImage src="/blog-images/foo.jpg" alt="..." className="w-full h-auto rounded-lg shadow-lg" />
```

When the image fails to load, a gray placeholder is shown instead of a broken image icon.
