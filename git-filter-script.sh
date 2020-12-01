#!/bin/bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch ./NextJs/client/next.config.js" \
  --prune-empty --tag-name-filter cat -- --all
