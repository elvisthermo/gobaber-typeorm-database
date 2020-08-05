// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string|null,
  value: string,
  type: string,
  category: string,
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });
    if (!transactionCategory) {
      transactionCategory = await categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(transactionCategory);
    }

    const transaction = transactionsRepository.create(
      {
        title,
        value,
        type,
        category: transactionCategory,
      });

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
