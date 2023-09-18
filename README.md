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
    [
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
    }
    ]

### Get User by ID

- **Route:** `GET /users/:id`
- **Description:** Retrieves a specific user by their ID.
- **Parameters:**
  - `id` (string): The unique ID of the user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Create a New User

- **Route:** `POST /users`
- **Description:** Creates a new user.
- **Request Body:**
  ```json
  
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Update a User

- **Route:** `PUT /users/:id`
- **Description:** Updates a new user.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Delete a User
- **Route:** `DELETE /users/:id`
- **Description:** Creates a new user.
- **Request Body:**
  ```json

  ```

### Get All Tasks by User
- **Route:** `GET /users/:id/tasks`
- **Description:** Retrieves a list of all tasks by user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    
    ```

### Get All Tasks
- **Route:** `GET /tasks`
- **Description:** Retrieves a list of all tasks.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Get Task by ID

- **Route:** `GET /tasks/:id`
- **Description:** Retrieves a specific task by their ID.
- **Parameters:**
  - `id` (string): The unique ID of the user.
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Create a New Task

- **Route:** `POST /tasks`
- **Description:** Creates a new task.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Assign a Task

- **Route:** `PUT /tasks/:id/assignee`
- **Description:** Assign (when userId available) or unassign a task (when userId empty).
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
### Update a Task
- **Route:** `PUT /tasks/:id/status`
- **Description:** Update a task status.
- **Request Body:**
  ```json

  ```

### Delete a Task
- **Route:** `DELETE /tasks`
- **Description:** Delete a task.
- **Request Body:**
  ```json

  ```

  



