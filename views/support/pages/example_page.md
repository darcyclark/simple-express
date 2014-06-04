---
title: Some other title
tags: [ update, gump ]
layout: page
draft: false
date: '2015/12/12'
---

I was reviewing static site frameworks like Docpad and Assemble, but I realised that eventually when working on most sites you need some sort of interactivity for things like contact forms and other things. Besides Express doesn't add that much overhead to projects - it's barely more complex than using a static framework and much more flexible. 

So we've tried to take some of the good ideas from static site generation frameworks and have brought them back into Express to make the management of static site content a little easier and a lot more flexible and powerful. We found static site generators to come with too many prescriptions for how things are done, where content should be stored and in what format.

So this project includes :

- Gulp build tool 
- Bower for front-end package management (bootstrap etc..)
- Live reload support <http://livereload.com/> 
- Textile and Markdown for text-heavy pages (see /support)
- Multiple layouts and partials via Jade
- Dynamic routes for static content (see app.js and /views/support/pages)
- YAML (or JSON) front-matter classification of static content (see /views/support/pages)
- Auto-generated menus and content listings (see /routes/support and /views/support/index.jade)
- Contact form (coming soon)
- Search (coming soon)

Installation
------------

```
git clone git@github.com:darcyclark/simple-express.git  
cd simple-express  
npm install  
bower install  
gulp copy:bower  

# start server  
gulp  

# open in browser  
http://localhost:5000
```
