import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Expenses } from './pages/expenses/expenses';
import { AddExpense } from './pages/add-expense/add-expense';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'expenses',
    component: Expenses
  },
  {
    path: 'add-expense',
    component: AddExpense
  },
  {
    path: 'add-expense/:id',
    component: AddExpense
  }
];