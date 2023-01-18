# Todo List API

This app is the backend application of a web based Todo List app.

<br>

## Live Preview

You can try this application at [http://todo-api.klcodes.com](http://todo-api.klcodes.com)

<br>

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) with your browser to check if the API is running.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<br>

```bash
npm run test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<br>

```bash
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<br>

```bash
npm start
```

Runs the app using the production build.\
Open [http://localhost:5000](http://localhost:5000) with your browser to check if the API is running.

<br>

```bash
npm run deploy
```

Runs the build and start command in succession. This command is used when deploying the app to your server.

<br>

## Features

1. User Registration
2. User Authentication
   1. Login
   2. Logout
3. Manage Lists
   1. View Lists
   2. Add New List
   3. Update List
   4. Remove List
4. Manage List Items
   1. View List Items
   2. Add New List Item
   3. Update List Item Name
   4. Mark List Item Complete/Not Complete
   5. Remove List Item

<br>

## Database

### DB Name

todo-app-db-v2

<br>

### Collections

<br>
Collection: **users**

Fields:

1. email
2. name
3. password
4. createdAt
5. updatedAt

Collection: **sessions**

Fields:

1. user (object)
2. valid
3. userAgent
4. createdAt
5. updatedAt

Collection: **lists**

Fields:

1. user (object)
2. name
3. createdAt
4. updatedAt

Collection: **items**

Fields:

1. list (object)
2. name
3. isComplete
4. createdAt
5. updatedAt
