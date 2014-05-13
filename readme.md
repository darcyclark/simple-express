Simple Express Template
=======================

I was reviewing static site frameworks like Docpad and Assemble, but I realised that eventually when working on most sites you need some sort of interactivity for things like contact forms and other things. Besides Express doesn't add that much overhead to projects - it's barely more complex than using a static framework and much more flexible.

So this project includes useful stuff that most sites need such as:

- Gulp build tool 
- Bower for front-end package management (bootstrap etc..)

Installation
------------

git clone git@github.com:darcyclark/simple-express.git  
cd simple-express  
npm install  
bower install  
gulp copy:bower  

Require with
``ruby
require 'dragonfly'
``
`
start server  
```gulp  

open in browser  
```http://localhost:5000  
