import { PrismaClient } from '@prisma/client'
// import { ContextParameters } from 'graphql-yoga/dist/types'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  request: any
}

// TODO: add type for request
export function createContext(request: any) {
  return {
    ...request,
    prisma,
  }
}
