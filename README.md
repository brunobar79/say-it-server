# SAY-IT server

HTTP Server (powered by express) that will play sounds (anonymously) based on incoming HTTP requests.

It could be use as a communication tool for an office / making announcments (ex. the classic "FOOD IS READY!") or you can get creative and have a LOT of fun with it.


## USAGE

### Text to speech:

http://localhost:3000/?speak=According%20to%20harold

### Text to speech (FEMALE VOICE):

http://localhost:3000/?speak=According%20to%20harold&gender=female


### Play MP3's:

Files should be located in the "sound" folder

http://localhost:3000/?file=gotem


Should be used with say-it-cli for a better experience

## TO INSTALL

```sh
npm install && npm install speaker --mpg123-backend=openal
```

## TO RUN

```sh
node server.js
```

## DEVELOPMENT

```sh
nodemon server.js
```

