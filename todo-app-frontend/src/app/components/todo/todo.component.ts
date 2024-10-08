import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Todo, TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  todos: Todo[] = [];
  title = '';

  ngOnInit(): void {
    this.getTodos();
  }

  constructor(private todoService: TodoService) { }
  addTodo(): void {
    const newTodo: Todo = { title: this.title, completed: false };
    this.todoService.addTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.title = '';
    });
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }
}
