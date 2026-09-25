import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Expense } from '../../interfaces/expense';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-expenses',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.css'
})
export class Expenses {

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpenses();
  }

  deleteExpense(id: number): void {

    const confirmed = confirm(
      'Bu harcamayı silmek istediğinize emin misiniz?'
    );

    if (confirmed) {
      this.expenseService.deleteExpense(id);
      this.loadExpenses();
    }
  }
}