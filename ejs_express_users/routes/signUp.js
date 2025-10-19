import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => res.render('signUp'));

export default router;
