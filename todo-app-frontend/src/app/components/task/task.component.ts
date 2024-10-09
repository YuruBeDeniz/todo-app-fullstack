import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({required: true}) task!: Task;
  @Output() completedChanged = new EventEmitter<Task>(); 
  taskForm!: FormGroup;


  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      completed: [this.task.completed]
    });
  }

  toggleComplete(): void {
    this.task.completed = !this.taskForm.get('completed')?.value;
    this.completedChanged.emit(this.task)
  }
}
