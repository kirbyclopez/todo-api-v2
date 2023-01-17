# Todo List API v2

This app is the backend application of a web based Todo List app.

<br>

## Running the application

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to check if the API is running.

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
3. items
   1. name
   2. isComplete
   3. createdAt
   4. updatedAt
4. createdAt
5. updatedAt
