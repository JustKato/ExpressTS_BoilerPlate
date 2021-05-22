// #region Imports
    import http from 'http';
    import express from 'express';
    import config from './config/config';

    // Routes
    import sampleRoutes from './routes/Sample';

//#endregion

const NAMESPACE = `🦝`;
const router    = express();


router.use((req, res, next) => {
    // Log the request to the server
    console.info(NAMESPACE, `METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

    res.on(`finish`, () => {
        console.info(NAMESPACE, `METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], STATUS: ${res.statusCode}`);
    })

    next();

})

// Parse the request
router.use(express.urlencoded({ extended: false }));
router.use(express.json({strict: false}));

// API Rules
router.use((req, res, next) => {
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

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    console.info(NAMESPACE, `Server Running on Port ${config.server.hostname}:${config.server.port}`)
})

