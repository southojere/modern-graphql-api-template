# GraphQL Server with Authentication & Permissions

This example shows how to implement a **GraphQL server with an email-password-based authentication workflow and authentication rules**, based on Prisma, [graphql-yoga](https://github.com/prisma/graphql-yoga), [graphql-shield](https://github.com/maticzav/graphql-shield) & [Nexus Schema](https://nxs.li/components/standalone/schema). You can run the database using docker or by using the database file that contains some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

## Tech Stack

- Backend:
  - PostgreSQL
  - Node.js
  - Prisma
  - TypeScript
  - Jest
  - GraphQL
  - Nexus

## How to use


Install dependencies:

```
npm install
```


Rename .env.example to .env. Then start up the database.

```
docker-compose up -d
```
then `docker-compose ps` to verify your database has started.

Generate types

```
npm run generate
```

Running the database for the first time (run migration scripts)

```
npm run migrate:up
```

Starting the GraphQL server

```
npm run dev
```

Seeding data

```
npm run seed
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).


# How to update data models

1) update `scheme.prisma`
2) next save the migration `npx prisma migrate save --experimental --name "init-db"` (prisma will take a snapshot of the schema and figure out the necessary steps to carry out the migration)
3) run the migration `npx prisma migrate up --experimental` (prisma migrate will use the newly created migration file to run the migration and alter the DB)


# Deployment

We are using Heroku to host the database and GraphQL API (PaaS).
This means our application will run constantly even if no requests are made to it. (FaaS vs PaaS https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/deployment#deployment-paradigms)

Ref: https://www.prisma.io/docs/guides/deployment/deploying-to-heroku

# CI/CD

We are using Github Actions.

## Prisma Studio (Built in database management tool)
If you want to view the database
```
npm run studio
```

# Usage
### Register a new user

You can send the following mutation in the Playground to sign up a new user and retrieve an authentication token for them:

```graphql
mutation createUser {
  signup(name:"bob", email:"bob@test.com", password: "pass") {
    user {
      name
    }
    token
  }
}
```

### Log in an existing user

This mutation will log in an existing user by requesting a new authentication token for them:

```graphql
mutation login {
 login(email:"bob@test.com",password:"pass"){
    token
    user {
      id
      name
    }
  }
}
```

### Check whether a user is currently logged in with the `me` query

For this query, you need to make sure a valid authentication token is sent along with the `Bearer`-prefix in the `Authorization` header of the request:

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a real token, this looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanAydHJyczFmczE1MGEwM3kxaWl6c285IiwiaWF0IjoxNTQzNTA5NjY1fQ.Vx6ad6DuXA0FSQVyaIngOHYVzjKwbwq45flQslnqX04"
}
```

Inside the Playground, you can set HTTP headers in the bottom-left corner:

![](https://imgur.com/ToRcCTj.png)

Once you've set the header, you can send the following query to check whether the token is valid:

```graphql
{
  me {
    id
    name
    email
  }
}
```

### 3. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

### TODO
- [ ] Add tests
- [ ] Add Prisma app to docker file
- [ ] Figure out how to deploy to other services other than heroku
