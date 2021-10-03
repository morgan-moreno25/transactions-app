import { SupabaseClient } from '@supabase/supabase-js';
import db from '../config/db';
import { RequestHandler, utils } from '@five-m/api-helpers';

const { asyncHandler, ErrorResponse, successResponse } = utils;

enum TransactionType {
	'income' = 1,
	'expense' = 2,
	'savingsDeposit' = 3,
	'savingsWithdrawal' = 4,
	'reimbursement' = 5,
	'investmentDeposit' = 6,
	'investmentWithdrawal' = 7,
}

interface ITransactionController {
	getAllTransactions: RequestHandler;
	getTransactionById: RequestHandler;
	createTransaction: RequestHandler;
	updateTransaction: RequestHandler;
	deleteTransaction: RequestHandler;
}

class TransactionController implements ITransactionController {
	private db: SupabaseClient;
	private SELECT_TRANSACTION: string;

	constructor(db: SupabaseClient) {
		this.db = db;
		this.SELECT_TRANSACTION = `
            id,
            createdAt: created_at,
            updatedAt: updated_at,
            date,
            amount,
            description,
			memo,
            type: type_id (
                id,
                name
            )
        `;
	}

	getAllTransactions = asyncHandler(async (req, res, next) => {
		res.render('transactions.ejs');
	});
	getTransactionById = asyncHandler(async (req, res, next) => {});
	createTransaction = asyncHandler(async (req, res, next) => {
		const { date, amount, description, type, memo } = req.body;

		if (
			type !== 'income' &&
			type !== 'expense' &&
			type !== 'savingsDeposit' &&
			type !== 'savingsWithdrawal' &&
			type !== 'reimbursement' &&
			type !== 'investmentDeposit' &&
			type !== 'investmentWithdrawal'
		) {
			return next(new ErrorResponse(400, `${type} is not a valid transaction type`));
		}

		const { data, error } = await this.db
			.from('transactions')
			.insert([{ date, amount, description, type_id: TransactionType[type], memo }])
			.select(this.SELECT_TRANSACTION);

		if (error) {
			return next(new ErrorResponse(400, error.message));
		}

		console.log('Transaction Created: ', data![0]);

		return res.redirect('/transactions');
	});
	updateTransaction = asyncHandler(async (req, res, next) => {});
	deleteTransaction = asyncHandler(async (req, res, next) => {});
}

export default new TransactionController(db);
