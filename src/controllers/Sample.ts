import { Request, Response, NextFunction } from 'express';

const NAMESPACE = `Sample Controller`;

/**
 * /ping
 */
const sampleHealthCheck = (req : Request, res : Response, next: NextFunction ) => {
    console.info(NAMESPACE, `CheckHealth Called`);

    res.status(200).json({
        message: "Pong"
    });
}

export default { sampleHealthCheck };