const app = require("../index")
const request = require("supertest")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Clear tasks before running tests
beforeAll(async () => {
  await prisma.task.deleteMany()
})

// Disconnect from the database after tests
afterAll(async () => {
  await prisma.$disconnect()
})

describe("GET /tasks", () => {
  it("should retrieve all tasks", async () => {
    const response = await request(app).get("/tasks")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })
})

describe("POST /tasks", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ description: "Test Task" })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("description", "Test Task")
    expect(response.body).toHaveProperty("created_at")
  })

  it("should return 400 if description is missing", async () => {
    const response = await request(app).post("/tasks").send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error", "Description is required")
  })
})

describe("DELETE /tasks/:id", () => {
  it("should delete a task by id", async () => {
    // First create a task to delete
    const newTask = await request(app)
      .post("/tasks")
      .send({ description: "Task to be deleted" })
    const taskId = newTask.body.id

    const response = await request(app).delete(`/tasks/${taskId}`)
    expect(response.status).toBe(204)
  })

  it("should return 500 if task does not exist", async () => {
    const response = await request(app).delete("/tasks/non-existing-id")
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty("error", "Failed to delete task")
  })
})

describe("PUT /tasks/:id", () => {
  it("should update a task by id", async () => {
    // First create a task to update
    const newTask = await request(app)
      .post("/tasks")
      .send({ description: "Task to be updated" })
    const taskId = newTask.body.id

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ description: "Updated Task Description" })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty(
      "description",
      "Updated Task Description"
    )
  })

  it("should return 400 if description is missing", async () => {
    // First create a task to update
    const newTask = await request(app)
      .post("/tasks")
      .send({ description: "Task to be updated" })
    const taskId = newTask.body.id

    const response = await request(app).put(`/tasks/${taskId}`).send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error", "Description is required")
  })

  it("should return 500 if task does not exist", async () => {
    const response = await request(app)
      .put("/tasks/non-existing-id")
      .send({ description: "Updated Task Description" })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty("error", "Failed to update task")
  })
})
