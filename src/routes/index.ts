import { Router } from 'express';
import transactions from './transactions';

const router: Router = Router();

router.use('/transactions', transactions);

export default router;
