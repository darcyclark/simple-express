Simple Express Template
=======================

This is my attempt to build a starter project template for typical web projects that involve a lot of static content and may also require some form of interactive component also. So I've attempted to meld an fairly standard Express 4.0 boilerplate with Docpad <http://docpad.org> as a light-weight CMS component. 

*THIS IS A WORK IN PROGRESS*

So this project includes :

- Gulp build tool for the Express component 
- Bower for front-end package management (bootstrap etc..)
- Live reload support <http://livereload.com/> 
- Docpad integration for content management
- Textile and Markdown for text-heavy pages

Installation
------------

```
git clone git@github.com:darcyclark/simple-express.git  
cd simple-express  
npm install  
bower install  
gulp copy:bower  

# start Express server  
gulp  

# open in browser  
http://localhost:5000
```

Docpad Integration
------------------

<http://docpad.org>

Managing content in Express is a drag, so we've included Docpad - a static website generation and management tool. It's a self-contained product that is configured here (in /static) to export static website content in /public of the Site-Express project template.

There are other potential ways to integrate Express and Docpad, as both are based on the same stack basically, but this approach is the simplest approach. Your project, when served by Express, will be an amalgamation of your interactive Express routes and the static content managed by Docpad. To best integrate your content, you will need to make the layouts of Express and Docpad match up. See /static/src/layouts and /views/layout.jade respectively.

*IMPORTANT*

Docpad is configured via /static/docpad.coffee to export the entire static website into /public. So consider Docpad to the manager of all public assets for your Express project.

```
# in a new terminal - to generate and run a dev server for your content
cd static
docpad run
# view at <http://localhost:9778>

# or to just generate your site into /public
docpad generate
```
