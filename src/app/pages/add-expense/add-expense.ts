import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css'
})
export class AddExpense implements OnInit {

  title = '';
  amount = 0;
  category = '';
  date = '';
  description = '';

  // Düzenleme modunda olup olmadığımızı tutar
  isEditMode = false;

  // Güncellenecek harcamanın ID'si
  expenseId: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.expenseId = Number(id);

      const expenses = this.expenseService.getExpenses();

      const expense = expenses.find(
        expense => expense.id === this.expenseId
      );

      if (expense) {
        this.title = expense.title;
        this.amount = expense.amount;
        this.category = expense.category;
        this.date = expense.date;
        this.description = expense.description;
      }
    }
  }

  addExpense(): void {

    if (this.isEditMode && this.expenseId !== null) {

      this.expenseService.updateExpense({
        id: this.expenseId,
        title: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
        description: this.description
      });

    } else {

      const newExpense = {
        id: Date.now(),
        title: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
        description: this.description
      };

      this.expenseService.addExpense(newExpense);
    }

    this.router.navigate(['/expenses']);
  }
}