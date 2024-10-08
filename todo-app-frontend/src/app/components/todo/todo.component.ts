import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  @Input() todo!: Todo;
  @Output() completedChanged = new EventEmitter<Todo>();

  toggleComplete(): void {
    this.todo.completed = !this.todo.completed;
    this.completedChanged.emit(this.todo)
  }
}
