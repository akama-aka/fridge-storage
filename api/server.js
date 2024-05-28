require('dotenv').config();
const db = require('sqlite');
const sqlite3 = require('sqlite3');
const fastify = require('fastify')({
    logger: true,
    caseSensitive: false,
    connectionTimeout: 10000,
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
    bodyLimit: 1048576,
    trustProxy: false
})

// Fastify register
fastify
    .register(require('@fastify/compress'))
    //.register(require('@punkish/fastify-better-sqlite3'));
// Start the fastify Server
fastify.listen({host: process.env.SERVER_HOST, port: process.env.SERVER_PORT}, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Server listening on ${address}`)
})

// Register the routes

require('./views/cat').forEach(loadRoute);
require('./views/products').forEach(loadRoute);

function loadRoute(routeOptions) {
    fastify.route(routeOptions);
}

// Fix CORS

fastify.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    done();
});

fastify.route({
    method: 'OPTIONS',
    url: '*',
    handler: async (req, res) => {
        res.send('ok');
    }
});
