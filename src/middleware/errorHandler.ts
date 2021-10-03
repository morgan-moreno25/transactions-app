import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		success: false,
		data: {
			message: err.message || 'Server Error',
		},
	});
};

export default errorHandler;
