# Simple secure RESTful API using Node JS
Reuse authentication part code of REST server, easily and flexibly

### Thanks to
  - [Express]() 
  - [JWT](https://github.com/auth0/node-jsonwebtoken) to sign and verify user token.
  - [Mongoose](https://github.com/Automattic/mongoose) to drive mongodb.
### Structure
Base API: `http://localhost:3000/api/v1`


| Method | url                 | data(if needed)                                            | server action |
| ------ |---------------------| -----------------------------------------------------------| -------------|
| POST   | /user               | {fisrtName: ..., lastName: ..., email: ..., password: ...} | create a user |
| POST   | /auth               | {email: ..., password: ...}                                | check user and return jwt token|
| GET    | /user               |                                                            | Get all users |
| GET    | /user/:id           |                                                            | Get user by ID |
| PATCH  | /user/:id           | {id: ..., password: ...}                                   | Change user password |
| DELETE | /user/:id           | {id: ...}                                                  | Delete user by ID |
