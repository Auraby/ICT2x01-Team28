## Pre-requisites

#### NodeJS 12

This app is developed on NodeJS 12.X so we should install that version. Below are CLI commands to install it on Ubuntu. You can check out [this tutorial](https://phoenixnap.com/kb/install-node-js-npm-on-windows) if you are using Windows 10.

`sudo apt-get install curl`

`curl -sL https://deb.nodesource.com/setup_12.x |`

`sudo -E bash -`

`sudo apt-get install -y nodejs`


## Quick Start
- Clone this repo `git clone https://github.com/warbear0129/ICT2x01-Team28`
- Install dependencies `cd frontend && npm install`
- Start the server `npm start`
- You can view the website on `localhost:3000`

## Development
#### SASS
Our CSS pre-processor of choice is SASS. SASS allowed us to write cleaner and modular CSS and also allows us to easily customize Boostrap 4 to theme our website. To setup SASS:
1. Download Bootstrap v4 source files
`cd ./frontend/src/scss/`
`wget https://github.com/twbs/bootstrap/archive/v4.0.0.zip`

2. Unzip the source files
`sudo apt install -y unzip`
`unzip bootstrapv4.0.0.zip`
3. Rename the folder
`mv ./bootstrap v4.0.0 ./bootstrap`

4. Run *node-sass* with watch flag to automatically compile our SCSS into CSS whenever there is changes
`npm run node-sass`

## Bugs and Issues

Found a bug or problem in implementation? [Open a new issue](https://github.com/warbear0129/ICT2x01-Team28/issues/new/choose) here on GitHub.

## Wireframe

You can view the wireframe at [Draw.io](https://app.diagrams.net/). To do this, download [Wireframe.xml](https://github.com/warbear0129/ICT2X01/blob/master/Wireframe.xml) then over at [Draw.io](https://app.diagrams.net/), go to File > Open From > Device then select [Wireframe.xml](https://github.com/warbear0129/ICT2X01/blob/master/Wireframe.xml).
