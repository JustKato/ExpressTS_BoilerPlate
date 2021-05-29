import express from 'express';
import controller from '../controllers/Homepage';

const router = express.Router();

router.get("/", controller.homepage);

export = router;