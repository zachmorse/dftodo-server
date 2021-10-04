import pkg from '@prisma/client'
const { PrismaClient } = pkg
import express from 'express'

// import * as cors from 'cors'

const port = process.env.port || 4000
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
// app.use(cors({ credentials: true, origin: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

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
app.delete('/api/tasks/delete', async (req, res) => {
  console.log('REQ>BODY', req.body)
  await prisma.task.delete({
    where: {
      id: req.body.id
    }
  })

  res.send(await getAllTasks())
})
