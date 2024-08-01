# Task Management Server

Task Management Server is a simple Node.js application that allows users to manage tasks. Users can add new tasks, view all tasks, and delete tasks by ID.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Prisma**: Database toolkit for Node.js and TypeScript.
- **NeonDB**: Postgresql Database.
- **Jest**: Testing framework.
- **Supertest**: HTTP assertion library.
- **Nodemon**: Development server.

## Features

- **Add Task**: Add a new task with a description.
- **View Tasks**: Retrieve a list of all tasks.
- **Delete Task**: Delete a task by ID.

## Local Setup

1. **Clone the Repository**

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Prisma**

   - Initialize Prisma: `npx prisma init`
   - Update the `.env` file with your database connection string.
   - Apply the migrations: `npx prisma migrate dev --name init`

4. **Run the Devlopment Server**

   ```bash
   npm run dev
   ```

5. **Run Tests**

   ```bash
   npm test
   ```

## API Endpoints

- **GET /tasks**: Retrieve a list of all tasks.

  - **Response:** `200 OK`: Returns an array of tasks.
  - **Error:** `500 Internal Server Error`: Failed to fetch tasks.

- **POST /tasks**: Add a new task.

  - **Request Body:** `description` (string): The task description.
  - **Response:** `201 Created`: Returns the created task object.
  - **Error:** `400 Bad Request`: Description is required.

- **DELETE /tasks/:id**: Delete a task by ID.
  - **Response:** `204 No Content`.
  - **Error:** `500 Internal Server Error`: Failed to delete task.

## Project Structure

- `index.js`: Main server file with API endpoint definitions.
- `prisma/`: Prisma configuration and schema files + migration files.
- `tests/`: Test files for the API endpoints.
