// #region Imports
    import http from 'http';
    import express from 'express';
    import config from './config/config';

    // Routes
    import sampleRoutes from './routes/Sample';

//#endregion

// Declare a NameSpace constant for each file so that it's easier to identify where debug messages are coming from
const NAMESPACE = `App`;
// Setup the expressJS instance
const router = express();


// Setup the router to log all activity that is happening
router.use((req, res, next) => {
    // Log the request to the server
    console.info(NAMESPACE, `METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

    // Whenever we finish the request, send out a message telling us what exactly has happened to it.
    res.on(`finish`, () => {
        console.info(NAMESPACE, `METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], STATUS: ${res.statusCode}`);
    })

    // Run the next function queued for this request
    next();
})

// Parse the request
router.use(express.urlencoded({ extended: false }));
router.use(express.json({strict: false}));

// API Rules
router.use((req, res, next) => {
    // Set some basic headers
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Request-With, Content-Type, Accept, Authorization`);

    if ( req.method == 'OPTIONS' ) {
        res.header(`Access-Control-Allow-Methods`, 'GET PATCH DELETE POST PUT');
        return res.send(200).json({});
    }

    next();
})

// Routing

router.use('/sample', sampleRoutes);

{ // Error handling
    router.use((req, res, next) => {
        const error = new Error(`Api Route Not Found`);

        return res.status(404).json({
            message: error.message
        })

    });
}

// Finally actually start the server and run it
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    console.info(NAMESPACE, `Server Running on Port ${config.server.hostname}:${config.server.port}`)
})

