#!/bin/bash
npm run build:prod
sed -i "s|PLACEHOLDER_BACKEND_URL|$BACKEND_URL|g" dist/browser/assets/config.json
