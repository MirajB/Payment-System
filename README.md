# EPL Easy Loan Pay

EPL is a simple but robust EMI payment system which comes with features with sending receipt to users email.

### Demo

[Play Video](./demo.mp4)

### Features

- Create/Register User with its details if there is no.
- Search with loan id
- Display all the details about your loan
- Gives flexibility to pay amount in full or partial payments
- No DB setup required
- Pay amount using Credit card, Debit card and Net Banking
- Sends Email with the details

### Setup

go to

```
cd ./payment-sys
```

install dependencies

```
yarn install or npm i
```

run project

We need to run this in two terminals as we also need to run server as well

```
yarn start:server
```

run client

```
yarn start
```

```
To run the application try with load Id - 123456789
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

Server runs on [http://localhost:4000](http://localhost:4000)

```
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Tech Stack

- React
- PDFkit
- Express
- LocalStorage
- Nodemailer
