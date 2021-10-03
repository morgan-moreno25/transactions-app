import { Router } from 'express';
import transactions from '../controllers/transactions';

const router: Router = Router();

/**
 * @method GET /api/transactions
 * @description Get all transactions
 * @access Public | Auth
 */
router.get('/', transactions.getAllTransactions);

/**
 * @method GET /api/transactions/:transactionId
 * @description Get a transaction by id
 * @access Public | Auth
 */
router.get('/:transactionId', transactions.getTransactionById);

/**
 * @method POST /api/transactions
 * @description Create a new transaction
 * @access Public | Auth
 */
router.post('/', transactions.createTransaction);

/**
 * @method PATCH /api/transactions/:transactionId
 * @description Update a transaction
 * @access Public | Auth
 */
router.patch('/:transactionId', transactions.updateTransaction);

/**
 * @method DELETE /api/transactions/:transactionId
 * @description Delete a transaction
 * @access Public | Auth
 */
router.delete('/:transactionId', transactions.deleteTransaction);

export default router;
