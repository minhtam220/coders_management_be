# Coders Management BackEnd 

This project is part of Full Stack Web - ExpressJS with MongoDB module by CoderSchool.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [API Routes](#api-routes)

## Introduction

The Back End provides the API to manage users and tasks.

## Technologies Used

- Node.js
- Express.js
- Mongoose

## API Routes

### Get All Users

- **Route:** `GET /users`
- **Description:** Retrieves a list of all users.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User list retrieved successfully",
      "data": [
        {
          "_id": "64e36be7fd02662b832c6b9d",
          "name": "an",
          "role": "manager",
          "createdAt": "2023-08-21T13:51:35.096Z",
          "updatedAt": "2023-08-21T13:51:35.096Z",
          "__v": 0
        },
        {
          "_id": "64e36be3fd02662b832c6b9a",
          "name": "anh",
          "role": "manager",
          "createdAt": "2023-08-21T13:51:31.557Z",
          "updatedAt": "2023-08-21T13:51:31.557Z",
          "__v": 0
        },
        {
          "_id": "64e36bf8fd02662b832c6ba3",
          "name": "bang",
          "role": "manager",
          "createdAt": "2023-08-21T13:51:52.531Z",
          "updatedAt": "2023-08-21T13:51:52.531Z",
          "__v": 0
        },
       ... 
      ],
      "totalCount": 3
    }
  ```

### Get User by ID

- **Route:** `GET /users/:id`
- **Description:** Retrieves a specific user by their ID.
- **Parameters:**
  - `id` (string): The unique ID of the user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User retrieved successfully",
      "data": {
        "_id": "64e36bf8fd02662b832c6ba3",
        "name": "bang",
        "role": "manager",
        "createdAt": "2023-08-21T13:51:52.531Z",
        "updatedAt": "2023-08-21T13:51:52.531Z",
        "__v": 0
      }
    }
    ```

### Create a New User

- **Route:** `POST /users`
- **Description:** Creates a new user.
- **Request Body:**
  ```json
  {
    "name":"phuong",
    "role":"manager"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "data": {
        "name": "phuong",
        "role": "manager",
        "_id": "65083b4be05640a1dd8b54e6",
        "createdAt": "2023-09-18T11:58:03.754Z",
        "updatedAt": "2023-09-18T11:58:03.754Z",
        "__v": 0
      }
    }
    ```

### Update a User

- **Route:** `PUT /users/:id`
- **Description:** Updates a user.
- **Request Body:**
  ```json
  {
    "name":"quynh"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User updated successfully",
      "data": {
        "_id": "65083b4be05640a1dd8b54e6",
        "name": "quynh",
        "role": "manager",
        "createdAt": "2023-09-18T11:58:03.754Z",
        "updatedAt": "2023-09-18T11:58:37.032Z",
        "__v": 0
      }
    }
    ```

### Delete a User
- **Route:** `DELETE /users/:id`
- **Description:** Deletes a user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User deleted successfully",
      "data": {
        "_id": "65083b4be05640a1dd8b54e6",
        "name": "quynh",
        "role": "manager",
        "createdAt": "2023-09-18T11:58:03.754Z",
        "updatedAt": "2023-09-18T11:58:37.032Z",
        "__v": 0
      }
    }
    ```

### Get All Tasks by User
- **Route:** `GET /users/:id/tasks`
- **Description:** Retrieves a list of all tasks by user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "User's tasks retrieved successfully",
      "data": [
        {
          "_id": "65083ea4e05640a1dd8b54ee",
          "name": "sing a song",
          "description": "sing a song",
          "status": "working",
          "assignee": "64e36bf8fd02662b832c6ba3",
          "isDeleted": false,
          "createdAt": "2023-09-18T12:12:20.554Z",
          "updatedAt": "2023-09-18T12:18:02.156Z",
          "__v": 0
        }
      ]
    }   
    ```

### Get All Tasks
- **Route:** `GET /tasks`
- **Description:** Retrieves a list of all tasks.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "data": {
        "data": [
          {
            "_id": "64e37170e0ad9a8096844a35",
            "name": "walk 5000 steps",
            "description": "walk 5000 steps",
            "status": "done",
            "isDeleted": false,
            "createdAt": "2023-08-21T14:15:12.360Z",
            "updatedAt": "2023-08-21T15:15:37.022Z",
            "__v": 0
          },
          {
            "_id": "64e3738fa1ff9d21b9e5de49",
            "name": "walk 5km",
            "description": "walk 5000 m",
            "status": "pending",
            "assignee": null,
            "isDeleted": false,
            "createdAt": "2023-08-21T14:24:15.764Z",
            "updatedAt": "2023-08-21T14:24:15.764Z",
            "__v": 0
          }
        ],
        "totalRecords": 2,
        "totalPages": 1
      },
      "message": "tasks retrieved successfully"
    }
    ```

### Get Task by ID

- **Route:** `GET /tasks/:id`
- **Description:** Retrieves a specific task by their ID.
- **Parameters:**
  - `id` (string): The unique ID of the task.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "data": {
        "data": {
          "_id": "64e37170e0ad9a8096844a35",
          "name": "walk 5000 steps",
          "description": "walk 5000 steps",
          "status": "done",
          "isDeleted": false,
          "createdAt": "2023-08-21T14:15:12.360Z",
          "updatedAt": "2023-08-21T15:15:37.022Z",
          "__v": 0
        }
      },
      "message": "single task retrieved successfully"
    }
    ```

### Create a New Task

- **Route:** `POST /tasks`
- **Description:** Creates a new task.
- **Request Body:**
  ```json
  {
      "name":"sing a song",
      "description": "sing a song"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Task created successfully",
      "data": {
        "name": "sing a song",
        "description": "sing a song",
        "status": "pending",
        "assignee": null,
        "isDeleted": false,
        "_id": "65083ea4e05640a1dd8b54ee",
        "createdAt": "2023-09-18T12:12:20.554Z",
        "updatedAt": "2023-09-18T12:12:20.554Z",
        "__v": 0
      }
    }
    ```

### Assign a Task

- **Route:** `PUT /tasks/:id/assignee`
- **Description:** Assign (when userId available) or unassign a task (when userId empty).
- **Request Body:**
  ```json
  {
  "assignee":"64e36bf8fd02662b832c6ba3"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Task assigned/unassigned successfully",
      "data": {
        "_id": "65083ea4e05640a1dd8b54ee",
        "name": "sing a song",
        "description": "sing a song",
        "status": "pending",
        "assignee": "64e36bf8fd02662b832c6ba3",
        "isDeleted": false,
        "createdAt": "2023-09-18T12:12:20.554Z",
        "updatedAt": "2023-09-18T12:15:22.821Z",
        "__v": 0
      }
    }
    ```
    
### Update a Task
- **Route:** `PUT /tasks/:id/status`
- **Description:** Update a task status.
- **Request Body:**
  ```json
  {
      "status":"working"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Status updated successfully",
      "data": {
        "_id": "65083ea4e05640a1dd8b54ee",
        "name": "sing a song",
        "description": "sing a song",
        "status": "working",
        "assignee": "64e36bf8fd02662b832c6ba3",
        "isDeleted": false,
        "createdAt": "2023-09-18T12:12:20.554Z",
        "updatedAt": "2023-09-18T12:18:02.156Z",
        "__v": 0
      }
    }
    ```
  

### Delete a Task
- **Route:** `DELETE /tasks/:id`
- **Description:** Delete a task.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Status updated successfully",
      "data": {
        "_id": "65083ea4e05640a1dd8b54ee",
        "name": "sing a song",
        "description": "sing a song",
        "status": "working",
        "assignee": "64e36bf8fd02662b832c6ba3",
        "isDeleted": false,
        "createdAt": "2023-09-18T12:12:20.554Z",
        "updatedAt": "2023-09-18T12:18:02.156Z",
        "__v": 0
      }
    }

  



