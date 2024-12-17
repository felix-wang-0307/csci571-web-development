# Web Performance
## The “initial” 14 Rules
1. Make fewer HTTP requests
  - e.g. combine images into CSS sprites
2. Use a CDN (content distribution network)
3. Add an Expires header
  - When `cache-control: max-age=31536000` is present, the browser will cache the resource for 1 year.
  - The max-age directive on a response implies that the response is cacheable
4. Gzip components
5. Put stylesheets at the top (to avoid progressive rendering)
  - <link>: `<link rel=“stylesheet” type=“text/css” href=“styles.css”>` - 
  - @import: `<style type=“text/css”>@import url(“styles.css”);</style>` - 
6. Move scripts to the bottom (to avoid blocking)
7. Avoid CSS expressions (obsoleted in IE8)
8. Make JS and CSS external
  - Implies more HTTP requests, but external files can be **cached**
9. Reduce DNS lookups
10. Minify JS
11. Avoid redirects
12. Remove duplicate scripts
13. Configure Etags
14. Make AJAX cacheable

## Updated Yahoo Best Practices (2011)
1. Flush the buffer early
2. Use GET for AJAX requests
3. Post-load components
4. Preload Components
5. Reduce the number of DOM Elements
6. Split Components Across Domains 
7. Minimize the number of iframes
8. No 404s
9. Reduce cookie size
10. Use cookie-free domains for components 
11. Minimize DOM access
12. Develop smart event handlers
13. Avoid filters
14. Optimize images
15. Optimize CSS sprites
16. Don’t scale images in html
17. Make favicon.ico small and cacheable 
18. Keep components under 25K
19. Pack components into a multipart document 
20. Avoid Empty image src
## What is the most important rule for improving web site performance? 
**Compress components!!!!!!!!!**

The types of files that should be compressed to improve web site performance:
- XML
- JavaScript (Minified or not)
- Text files
- JSONP files
- JSON files
- ...
**All** except images and PDFs (which are already compressed).


## The Performance Golden Rule
80-90% of the end-user response time is spent on the front-end. 
Therefore you should start there because:
- it is much cheaper than changing back end

