"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const jwt_1 = require("./jwt");
const entity_1 = require("./teachers/entity");
const controller_1 = require("./teachers/controller");
const controller_2 = require("./logins/controller");
const controller_3 = require("./batches/controller");
const controller_4 = require("./students/controller");
const controller_5 = require("./evaluations/controller");
const IO = require("socket.io");
const socketIoJwtAuth = require("socketio-jwt-auth");
const jwt_2 = require("./jwt");
const http_1 = require("http");
const Koa = require("koa");
const app = new Koa();
const server = new http_1.Server(app.callback());
exports.io = IO(server);
const port = process.env.PORT || 4003;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            try {
                return !!(token && jwt_1.verify(token));
            }
            catch (e) {
                throw new routing_controllers_1.BadRequestError(e);
            }
        }
        return false;
    },
    currentUserChecker: async (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            if (token) {
                const { id } = jwt_1.verify(token);
                return entity_1.default.findOneById(id);
            }
        }
        return undefined;
    }
});
exports.io.use(socketIoJwtAuth.authenticate({ secret: jwt_2.secret }, async (payload, done) => {
    const teacher = await entity_1.default.findOneById(payload.id);
    if (teacher)
        done(null, teacher);
    else
        done(null, false, `Invalid JWT teacher ID`);
}));
exports.io.on('connect', socket => {
    const name = socket.request.user.name;
    const role = socket.request.user.role;
    console.log(`${role} ${name} just connected`);
    socket.on('disconnect', () => {
        console.log(`Teacher ${name} just disconnected`);
    });
});
db_1.default()
    .then(_ => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map