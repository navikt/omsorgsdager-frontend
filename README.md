#omsorgsdager-frontend

Mikrofrontend for omsorgspenger.

##To run app in development

`npm run dev`

##To make a production build of the app

`npm run build`

##To run a production build locally

`npm run start`

##To deploy production build of the app with a new version

`npm run buildNewVersion`

Will increase patch version in package.json and generate a new build. 

##Generate a new build when developing locally

`npm run buildDev`

Will generate a new build in the current version declared in package.json, calculate and print out the hashes of the build to be used in k9-sak-web and starts the dev server again.

##Calculate the SHA256 and SHA384 hashes of the latest build

`yarn calculateHashOnLatestBuild`


