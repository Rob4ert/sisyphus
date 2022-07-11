<h1 align="center">Sisyphus</h1>

Workout logger and exercise routine tracker. Simple desing combined with sizeable functionality. Available in web and mobile version (Atlas)


## Frontend
Made in Angular, with help of material UI.


## Backend
Made with NodeJs, Express, Sequelize as an ORM and Postgres as a DB.



## How to start it
If you want to run the app you will need postgres, and an .env file 
with a the secret for the cookie sessions, the postgres url and the port of the 
express server.

Installation:
  - in client and server folder run npm i
  - run nodemon index.js inside the server directory to run the backend.
  - type ng serve in the client folder to run the app

<h1 align="center"> Atlas </h1>

Atlas is a fully responsive mobile version of Sisyphus converted with Capacitor

Installation:
  - download and install [Android SDK Studio](#developer.android.com/studio) 
  - in client and server folder run npm i
  - inside capacitor.config change server url to your ip address.
  - run npx cap copy
  - run npx cap open android
  - pick your emulator or connect your device through the wifi
  - type ng serve in the client folder to run the app
