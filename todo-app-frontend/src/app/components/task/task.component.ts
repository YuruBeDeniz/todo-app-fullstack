import { Component, Input } from '@angular/core';
import { Task } from '../../../services/task.service';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  @Input() task!: Task;
  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      completed: [this.task.completed]
    });
  }

  toggleComplete(): void {
    this.task.completed = !this.taskForm.get('completed')?.value;
  }
}
