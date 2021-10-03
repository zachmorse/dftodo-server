import { PrismaClient } from '@prisma/client'
import express from 'express'
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.port || 4000
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.listen(port, () => console.log(`Server listening on port ${port}`))

const getAllTasks = async () => await prisma.task.findMany()

// routes
app.get('/api/tasks', async (req, res) => {
  const allTasks = await getAllTasks()
  res.send(allTasks)
})

app.post('/api/tasks/create', async (req, res) => {
  await prisma.task.create({
    data: {
      description: req.body.description
    }
  })
  res.send(await getAllTasks())
})

// change description
app.put('/api/tasks/update/description', async (req, res) => {
  const { id, description } = req.body
  await prisma.task.update({
    where: { id: id },
    data: {
      description: description
    }
  })
  res.send(await getAllTasks())
})

// change status
app.put('/api/tasks/update/status', async (req, res) => {
  const { id, status } = req.body
  await prisma.task.update({
    where: { id: id },
    data: { status: status }
  })
  res.send(await getAllTasks())
})

// delete
app.delete('/api/tasks/delete/', async (req, res) => {
  await prisma.task.delete({
    where: {
      id: req.body.id
    }
  })

  res.send(await getAllTasks())
})
