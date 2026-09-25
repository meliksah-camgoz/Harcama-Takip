import { Injectable } from '@angular/core';
import { Expense } from '../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private storageKey = 'expenses';

  getExpenses(): Expense[] {
    const expenses = localStorage.getItem(this.storageKey);

    return expenses ? JSON.parse(expenses) : [];
  }

  addExpense(expense: Expense): void {
    const expenses = this.getExpenses();

    expenses.push(expense);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(expenses)
    );
  }

  updateExpense(updatedExpense: Expense): void {
    const expenses = this.getExpenses();

    const index = expenses.findIndex(
      expense => expense.id === updatedExpense.id
    );

    if (index !== -1) {
      expenses[index] = updatedExpense;

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(expenses)
      );
    }
  }

  deleteExpense(id: number): void {
    const expenses = this.getExpenses();

    const filteredExpenses = expenses.filter(
      expense => expense.id !== id
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(filteredExpenses)
    );
  }
}