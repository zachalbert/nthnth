---
sample: data
title: "Sample"
date: 12-12-2012
---

# Sample Data

Use markdown files in the /content folder for quick, one-off additions to a site
that are specific to a single client and unlikely to reoccur. Avoid changing the
content model in contentful unless it makes sense to change for all clients.
Data in this file is accessible alongside the data from contentful in the templates.
Contentful content is accessed via `{{ contentful.title }}`, whereas data
in this file is accessed via `{{ FILE_NAME.title }}` (which refers to the
"title:" key in the front matter).
