---
route: /blog/:slug
entry_point: src/pages/BlogPost.tsx
category: Content
---

Renders one post from src/data/blogPosts.ts (lite-markdown body array) with BlogPosting JSON-LD.
To add a post: append to the `blogPosts` array in src/data/blogPosts.ts and add its URL to
public/sitemap.xml and public/llms.txt — no new route/component needed.
