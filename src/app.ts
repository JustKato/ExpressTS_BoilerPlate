// #region Imports
    import http from 'http';
    import express from 'express';
    import config from './config/config';
    import exphbs from 'express-handlebars';
    import path from 'path';

    // Routes
    import sampleRoutes from './routes/Sample';
    import Homepage from './routes/Homepage';

//#endregion

// Declare a NameSpace constant for each file so that it's easier to identify where debug messages are coming from
const NAMESPACE = `App`;
// Setup the expressJS instance
const router = express();

// Set the view engine as Handlebars
router.set('view engine', 'hbs');

router.engine("hbs", exphbs({
    extname: 'hbs'
}));

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

// Register the public folder where you can serve static/public data
router.use(`/public`, express.static('./src/public/'));

// Handle the homepage
router.get("/", Homepage);

// An example API route
router.use('/api', sampleRoutes);


{ // Error handling
    router.use((req, res, next) => {
        // Generate an error
        const error = new Error(`Page Not Found`);

        // Set the response to 404
        res.status(404)

        // Read the request's preffered response type ( default text/html )
        if ( !!req.headers.accept ) {
            // Check if HTML is acceptable
            console.log(req.headers.accept);
            if ( req.headers.accept.includes(`text/html`) ) {
                return res.sendFile(`./views/errors/404.html`, { root: __dirname });
            }
        }

        // If text/html is not accepted, then simply return a JSON
        return res.json({
            message: error.message
        })

    });
}

// Finally actually start the server and run it
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    console.info(NAMESPACE, `Server Running on Port ${config.server.hostname}:${config.server.port}`)
})

