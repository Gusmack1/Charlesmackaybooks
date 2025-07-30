#!/bin/bash

# Script to add PageSEO component to all book pages

BOOK_PAGES=(
  "aircraft-carrier-argus"
  "birth-atomic-bomb"
  "british-aircraft-great-war"
  "captain-eric-brown"
  "clydeside-aviation-vol2"
  "dieter-dengler"
  "dorothy-wordsworth"
  "enemy-luftwaffe-1945"
  "flying-for-kaiser"
  "german-aircraft-great-war"
  "modern-furniture"
  "mother-of-the-few"
  "sabres-from-north"
  "soaring-with-wings"
  "sonic-to-standoff"
  "sycamore-seeds"
)

for book in "${BOOK_PAGES[@]}"; do
  echo "Adding SEO to books/${book}/page.tsx"

  # Add import
  sed -i "s/import { useState } from 'react'/import { useState } from 'react'\nimport PageSEO from '@\/components\/PageSEO'/g" "src/app/books/${book}/page.tsx"

  # Add PageSEO component after opening div
  sed -i '/return (/,/div className="min-h-screen/{
    /div className="min-h-screen/a\
      <PageSEO\
        title={book.title + " | Charles E. MacKay Aviation Books"}\
        description={book.description}\
        path={`/books/${book.id}`}\
        type="book"\
        price={book.price}\
        isbn={book.isbn}\
      />
  }' "src/app/books/${book}/page.tsx"
done

echo "SEO added to all book pages!"
