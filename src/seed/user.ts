import { log } from '.'

const seedUserData = (prisma: any) => {
  log('User table data')
  const seedUsers = [
    {
      email: 'southon@test.com',
      name: 'jeremy',
      password: 'pass',
    },
    {
      email: 'admin@example.com',
      name: 'admin',
      password: 'pass',
    },
    {
      email: 'test-user@test.com',
      name: 'Jane',
      password: 'pass',
    },
  ]

  const promises = seedUsers.map(user =>
    prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    }),
  )
  return Promise.all(promises)
}

export default seedUserData
