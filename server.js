import pkg from '@prisma/client'
const { PrismaClient } = pkg
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 4000
const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.listen(port, () => console.log(`Server listening on port ${port}`))

const getAllTasks = async () => await prisma.task.findMany()

app.get('/api/tasks', async (req, res) => {
  const allTasks = await getAllTasks().catch(err => console.log(err))
  res.send(allTasks)
})

app.post('/api/tasks/create', async (req, res) => {
  await prisma.task
    .create({
      data: {
        description: req.body.description
      }
    })
    .catch(err => console.log(err))
  res.send(await getAllTasks())
})

app.put('/api/tasks/update', async (req, res) => {
  const { id, description, status } = req.body
  await prisma.task
    .update({
      where: { id: id },
      data: {
        description: description,
        status: status
      }
    })
    .catch(err => console.log(err))
  res.send(await getAllTasks())
})

app.delete('/api/tasks/delete', async (req, res) => {
  await prisma.task
    .delete({
      where: {
        id: req.body.id
      }
    })
    .catch(err => console.log(err))

  res.send(await getAllTasks())
})
