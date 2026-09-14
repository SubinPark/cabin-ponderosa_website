#!/bin/bash

PROJECT_DIR="/Users/subinpark/VSCode/cabin-ponderosa_website"
GALLERY_PATH="client/src/assets/gallery"

cd "$PROJECT_DIR" || {
  echo "Could not find the project folder at $PROJECT_DIR"
  read -p "Press Enter to close..."
  exit 1
}

echo "Publishing cabin photos..."
echo ""

git add "$GALLERY_PATH"

if git diff --cached --quiet -- "$GALLERY_PATH"; then
  echo "No photo changes found in $GALLERY_PATH — nothing to publish."
  echo ""
  read -p "Press Enter to close..."
  exit 0
fi

git commit -m "Update cabin photos ($(date '+%Y-%m-%d %H:%M'))"
if [ $? -ne 0 ]; then
  echo ""
  echo "Commit failed — see the error above."
  read -p "Press Enter to close..."
  exit 1
fi

git push origin main
if [ $? -ne 0 ]; then
  echo ""
  echo "Push failed — check your internet connection, then try again."
  echo "(Your changes are safely committed on your laptop either way.)"
  read -p "Press Enter to close..."
  exit 1
fi

echo ""
echo "Done. Netlify will redeploy the site in a minute or two."
osascript -e 'display notification "Photos pushed — site is redeploying." with title "Cabin Ponderosa"' >/dev/null 2>&1

echo ""
read -p "Press Enter to close this window..."
