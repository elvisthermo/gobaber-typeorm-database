import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepositories = getRepository(Transaction);

    const deletetransaction = transactionsRepositories.find({
      where: { id },
    });

    if (!deletetransaction) {
      throw new AppError('This transaction does not exist', 400);
    }

    await transactionsRepositories.delete({ id });
  }
}

export default DeleteTransactionService;
