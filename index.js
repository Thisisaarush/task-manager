const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express()
app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:3000", "https://task-manager-frontend-dusky.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
)

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

// Add a new task
app.post("/tasks", async (req, res) => {
  const { description } = req.body
  if (!description) {
    return res.status(400).json({ error: "Description is required" })
  }
  try {
    const newTask = await prisma.task.create({
      data: { description },
    })
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" })
  }
})

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params
  try {
    await prisma.task.delete({
      where: { id },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" })
  }
})

// Edit a task by ID
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  if (!description) {
    return res.status(400).json({ error: "Description is required" })
  }
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { description },
    })
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" })
  }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
