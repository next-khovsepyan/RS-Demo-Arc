import express, { Router } from 'express';
import apiRoutes from './api'

const router: Router = express.Router();
const path = require('path');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home', 'index.html'));
})


export default router;