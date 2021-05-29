import { Request, Response, NextFunction, Router } from 'express';

const homepage = ( req:Request, res:Response, next:NextFunction ) => {

    // Make sure that the browser isn't caching this
    res.setHeader(`Cache-Control`, `no-cache, must-revalidate`);
    res.setHeader(`Pragma`,        `no-cache`);
    res.setHeader(`Expires`,       `Sat, 26 Jul 1997 05:00:00 GMT`);

    // Render the home page
    res.render('home', {
        // This is a simple variable
        title: 'Page Title',
        // A simple list example for the loops
        listExample: {
            0: {id: 0, name: `ZERO`},
            1: {id: 1, name: `First`, disabled: true},
            2: {id: 2, name: `Second`},
            3: {id: 3, name: `Third`},
        },
        // layout: 'main', // Change this from main to your layout ( from the layouts folder ) if you so wish, it's basically the wrapper of it all
        time: new Date().toLocaleDateString()
    });
}

export default { homepage }