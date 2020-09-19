import { PrismaClient } from '@prisma/client'
import seedUserData from './user'
import seedPostData from './post';

export const log = (msg: string) =>
  console.log(`====== [Seeding Data] ${msg} ======`)

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  // clear all data to avoid any constraint errors
  await Promise.all([prisma.user.deleteMany({}), prisma.post.deleteMany({})]).then(() => log('Clearing data'))
  await seedUserData(prisma)
  await seedPostData(prisma);
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.disconnect()
  })
