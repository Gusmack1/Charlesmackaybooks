#!/bin/bash

# Add PageSEO to remaining blog pages that don't have it yet

BLOG_PAGES=(
  "aviation-manufacturing-wartime-production"
  "helicopter-development-pioneers"
  "naval-aviation-history"
)

for blog in "${BLOG_PAGES[@]}"; do
  echo "Adding SEO to blog/${blog}/page.tsx"

  # Add import if not already there
  grep -q "PageSEO" "src/app/blog/${blog}/page.tsx" || {
    sed -i "s/import SocialShare from '@\/components\/SocialShare'/import SocialShare from '@\/components\/SocialShare'\nimport PageSEO from '@\/components\/PageSEO'/g" "src/app/blog/${blog}/page.tsx"
  }

  # Add PageSEO component after opening div (for blog pages with different structure)
  sed -i '/return (/,/div className="min-h-screen/{
    /div className="min-h-screen/a\
      <PageSEO\
        title={metadata.title || ""}\
        description={metadata.description || ""}\
        path="/blog/'${blog}'"\
        type="article"\
      />
  }' "src/app/blog/${blog}/page.tsx"
done

# Add SEO to remaining utility pages
UTILITY_PAGES=(
  "aviation-bibliography"
  "aviation-glossary"
  "aviation-news"
  "research-guides"
  "scottish-aviation-timeline"
  "timeline"
)

for page in "${UTILITY_PAGES[@]}"; do
  echo "Adding SEO to ${page}/page.tsx"

  # Check if it's a client component or server component and add accordingly
  if grep -q "'use client'" "src/app/${page}/page.tsx"; then
    # Client component
    sed -i "s/import Header from '@\/components\/Header'/import Header from '@\/components\/Header'\nimport PageSEO from '@\/components\/PageSEO'/g" "src/app/${page}/page.tsx"
  else
    # Server component - just add the import
    sed -i "1i import PageSEO from '@/components/PageSEO'" "src/app/${page}/page.tsx"
  fi
done

echo "SEO added to blog and utility pages!"
