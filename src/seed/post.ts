import { log } from '.'
import { PrismaClient } from '.prisma/client'

const seedPostData = (prisma: PrismaClient) => {
  log('Post table data')
  return prisma.post.create({
    data: {
      author: {
        connect: {
          email: 'southon@test.com',
        },
      },
      title: 'Creating seed data',
      content:
        'This will be about how to create seed data and connecting/linking its related tables. In this example we are creating a Post and connecting it to an existing User row. We can also use `create` if we wanted to create a new row.',
    },
  })
}

export default seedPostData
