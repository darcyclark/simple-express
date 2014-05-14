Simple Express Template
=======================

I was reviewing static site frameworks like Docpad and Assemble, but I realised that eventually when working on most sites you need some sort of interactivity for things like contact forms and other things. Besides Express doesn't add that much overhead to projects - it's barely more complex than using a static framework and much more flexible.

So this project includes :

- Gulp build tool 
- Bower for front-end package management (bootstrap etc..)
- Live reload support <http://livereload.com/> 
- Textile and Markdown for text-heavy pages (see /support)

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
