## Requirements

Node.js version >= 12

npm version >= 6.14

## Installation

Clone the repository in terminal by clicking the green clone button at the top right and copy the url

In terminal, type `git clone URL`

replace URL with the copied url and hit enter. This will copy all the files from this repository

In terminal, cd into the directory which was just created

Type `npm install` to install all dependencies

## API KEYS

This app uses Google Vision API, Cloudinary and MongoDB which need API keys.

In order to set them correctly follow these steps:

1. Create .env and APIkey.json files in project's root directory. 

2. To use Google Vision API get key in JSON format and place it in APIkey.json file.

3. For Cloudinary create an account and get credentials. After login find required keys on dashboard under “Account Details” section and then paste it on .env file.

CLOUDINARY_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''

4. Paste MongoDB connection string on .env file and replace empty string with your credentials.

MONGO_KEY=''

## Starting server

Start Node.js server:

### `cd server`

### `node server.js`

Open page:

In the project directory run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload after edits.\

