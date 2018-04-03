import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from "routing-controllers"
import setupDb from './db'
import { verify } from './jwt'
import Teacher from './teachers/entity'
import TeachersController from './teachers/controller'
import LoginController from './logins/controller'
import BatchesController from './batches/controller'
import * as IO from 'socket.io'
import * as socketIoJwtAuth from 'socketio-jwt-auth'
import {secret} from './jwt'
import {Server} from 'http'
import * as Koa from 'koa'

const app = new Koa()
const server = new Server(app.callback())
export const io = IO(server)
const port = process.env.PORT || 4003


useKoaServer(app, {
  cors: true,
  controllers: [
    TeachersController,
    LoginController,
    BatchesController
  ],
  authorizationChecker: (action: Action) => {
   const header: string = action.request.headers.authorization
   if (header && header.startsWith('Bearer ')) {
     const [ , token ] = header.split(' ')

     try {
       return !!(token && verify(token))
     }
     catch (e) {
       throw new BadRequestError(e)
     }
   }

   return false
 },
 currentUserChecker: async (action: Action) => {
   const header: string = action.request.headers.authorization
   if (header && header.startsWith('Bearer ')) {
     const [ , token ] = header.split(' ')

     if (token) {
       const {id} = verify(token)
       return Teacher.findOneById(id)
     }
   }
   return undefined
 }
})

io.use(socketIoJwtAuth.authenticate({ secret }, async (payload, done) => {
  const teacher = await Teacher.findOneById(payload.id)
  if (teacher) done(null, teacher)
  else done(null, false, `Invalid JWT teacher ID`)
}))

io.on('connect', socket => {
  const name = socket.request.user.name
  const role = socket.request.user.role
  console.log(`${role} ${name} just connected`)

  socket.on('disconnect', () => {
    console.log(`Teacher ${name} just disconnected`)
  })
})


setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error(err))
