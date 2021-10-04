import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const taskData = [
  {
    description: 'Prisma and Typescript, become one with them',
    status: 'incomplete'
  },
  {
    description: 'Some other unspecified things...',
    status: 'incomplete'
  },
  {
    description: 'Live long and prosper',
    status: 'proceeding'
  },
  {
    description: 'Get pretty alright at bass guitar',
    status: 'complete'
  }
]

async function main() {
  console.log(`Start seeding ...`)

  taskData.forEach(async taskInfo => {
    const task = await prisma.task.create({
      data: taskInfo
    })
    console.log(`Created task`, task)
  })

  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
