import { log } from '.'

const seedUserData = (prisma: any) => {
  log('User table data')
  const seedUsers = [
    {
      email: 'southon@test.com',
      name: 'jeremy',
      password: '$2a$10$Bc7sDD.a.paDMDVMBexzXuUw6Renj71b8KZZYPAqJMVhFSxALUTke',
    },
    {
      email: 'admin@example.com',
      name: 'admin',
      password: '$2a$10$Bc7sDD.a.paDMDVMBexzXuUw6Renj71b8KZZYPAqJMVhFSxALUTke',
    },
    {
      email: 'test-user@test.com',
      name: 'Jane',
      password: '$2a$10$Bc7sDD.a.paDMDVMBexzXuUw6Renj71b8KZZYPAqJMVhFSxALUTke',
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
