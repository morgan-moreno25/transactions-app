import { Router } from 'express';
import transactions from '../controllers/transactions';

const router: Router = Router();

/**
 * @method POST /api/transactions
 * @description Create a new transaction
 * @access Public | Auth
 */
router.post('/', transactions.createTransaction);


export default router;
