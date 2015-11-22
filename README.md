
##  About this setup
- Note- I am writing this post in very jiffy so please excuse me for grammatical/spelling mistakes

While doing web development we often come across scenario of collaborating with teams with different skillsets. To overcome that for smaller projects we follow follwing guidelines

- product manager to gather requirements and create mockups
- designer to create designs based on mockups
- html/css developer to create static pages
- frontend js team to integrate static pages in their workflow with data (either by putting static pages in templating language or in jsx)
- frontend js/native teams to discuss and finalize with backend team about json api's.
- once api structure is finalised frontend js/native team can asume those api's and mock them in their workflow
- backend team starts working on creating real api's which will be integrated with frontend later (by replacing mocked api's in frontend)

So in this post I am going to focus on segragating following flow:
 - html/css developer to create static pages
- frontend js team to integrate static pages in their workflow with data (either by putting static pages in templating language or in jsx)

Often times frontend team chooses various frameworks like backbone, angular, react etc.
Backbone is mostly used along with templates such as mustache, handlebars or underscore templates.
Angular has its own templates. In react jsx is often used in which html and js is mixed up.

Frontend developers who do htmls/css as well as javascript there is no problem in their flow as they have complete control over both technlogies. However many times we have separate html/css team and javascript team. In later case, we often face problems on collborating. JS team often refractor thier code in smaller components/directives etc and they want html/css separate for these components. HTML/CSS team can't follow along all the time and find it dificult to know about all the files for smaller templates/components/directives. This is particulary true when using react as js and html code is mixed up.

To solve that problem we have created separate workflow for htmls/css developer. This directory demonstartes that.
In this repo we have set up gulp tasks for live reloading html(ejs templates in this case) and scss files whenever changes are made to them. Sass souce maps are enabled so that its very easy for CSS devs to make changes to thier scss files from browser itself.

So CSS devs now make their static pages in this repo. ejs templates are used for them to extract common components such as header, footer, side navigation etc so that they need not copy-paste them in every file. Live reload for html (ejs) and css (scss) along with many cool features of browserSync (see their site for extra features http://www.browsersync.io/) provides pleasant workflow for css team to work.


###  Few notes
- Used nodejs v0.12.7 aloing with expressjs for routing and ejs for server side templating
- used gulp for orchestating different flows of live reload, sass to css conversion and watching changes on css and ejs files
- used "$npm shrinkwrap --dev" command to lock down exact npm module version
- proxy feature of browser-sync is used to proxy requests to node sever on port 8000

### Installation
- need git installed
- for linux/osX i use nvm to manage node versions. This repo is tested on node v0.12.7 and not on others
   ##### nvm  instructions for mac/ubuntu
       - go to https://github.com/creationix/nvm and read instructions
       - Enter following command to install nvm
       - curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
       - then do "nvm ls-remote" to see all availalbe options
       - do "nvm install v0.12.7"
       - do "nvm use v0.12.7" to  activate installed node
       - check if node is available by doing "node --version"

   ##### nvmw instructions for windows
       - go to https://github.com/hakobera/nvmw and read instructions
       - run command: git clone git://github.com/hakobera/nvmw.git "%HOMEDRIVE%%HOMEPATH%\.nvmw
       - run this command:  set "PATH=%HOMEDRIVE%%HOMEPATH%\.nvmw;%PATH%"
       - run command: nvmw install 0.12.7


### Instructions to run app
- Clone repo and cd into repo
- run command "$npm install" within folder.
- install gulp globally with "$npm install gulp -g"
- run command "$gulp" to start server
- server will start on port 3000.
- open localhost:3000 from browser (stop the page and reload again if you face some problem)
- to edit scss files from the browser so that changes are persisted to filesystem follow following articles

- http://www.amazeelabs.com/en/How-to-write-Sass-within-Chromes-DevTools-using-Workspaces-and-Auto-reload

- https://robots.thoughtbot.com/sass-source-maps-chrome-magic

- make changes to .scss files (in static_files/scss directory) or .ejs files (in server/views2 directory) and see the changes reflected instantly
- Go to browsersync site and see their other cool features of scroll, input type and click replication over many browsers.
- I will try to make video screencast of this whole setup and post video link here

Enjoy the enhanced work flow.

Cheers!!
Nikhil
