import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../interfaces/expense';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  expenses: Expense[] = [];
  recentExpenses: Expense[] = [];

  totalExpense = 0;
  expenseCount = 0;
  thisMonthExpense = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.expenses = this.expenseService.getExpenses();

    this.recentExpenses = [...this.expenses]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    this.expenseCount = this.expenses.length;

    this.totalExpense = this.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    this.thisMonthExpense = this.expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);

        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce(
        (total, expense) => total + expense.amount,
        0
      );
  }
}