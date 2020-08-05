import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';
interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute( id:string ): Promise<any> {
    const transactionsRepositories = getCustomRepository(TransactionsRepository);

    const deletetransaction = await transactionsRepositories.findOne(id);

    if (!deletetransaction) {
      throw new AppError('Transaction does not exist');
    }

    await transactionsRepositories.remove(deletetransaction);
  }
}

export default DeleteTransactionService;
