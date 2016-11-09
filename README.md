# to-blah
A sample app to do anything!

## Basic ToDo app

This app is written in angular 1.4 to... well do anything!

The things you can do are:

- buy
- learn
- see
- eat
- read
- visit

But that's not important!

The important stuff is the feaures that I re-familiarized myself with after a year hiatus with Angular.

These are:

- Structure - I preferred breaking out the common stuff, services and directives from business specific modules (like buy, eat do, visit etc).

- Use of directives - Since there was a lot of repetitive code in buying eating etc, I abstracted that out in a directive called chalkboard.
 
- Use of includeSource plugin in the Gruntfile. This allows for the inclusion of js code automagically instead of having to remember to include source in index.html.  See index.tpl.html and the comments therein and the includeSource task in Gruntfile.js

- Use of wiredep that dumps the bower dependencies into index.html at build time.

- Use of application wide constants in a service factory. See toblah_constant.js

- The use of ui.router. See app.js and how an abstract state provides a top level state for all others to share. index.html -> main.html -> state-specific view.html

- Views are business module specific. There are no module specific controllers in this application, but if there were, there could be a module specific directory that would hold both views and controllers.


## To run

`npm install`

`npm install grunt`

`npm install grunt-cli`

followed by

`grunt serve`

Then navigate to:

`http://localhost:9000/#/main/todo`
