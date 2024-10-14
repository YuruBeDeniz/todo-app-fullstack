import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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

  isCompleted = signal<boolean>(false);

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.isCompleted.set(this.task.completed); // initialize signal with task's completed state

    this.taskForm = this.formBuilder.group({
      completed: [this.task.completed]
    });
  }

  //toggleComplete() updates the signal instead of the form control directly.
  toggleComplete(): void {
    this.isCompleted.update(value => !value);
    this.task.completed = this.isCompleted(); // update task's completed state by getting the current signal value
    this.completedChanged.emit(this.task);
  }
}


  //value omes from the current value of the signal. 
  //When you call the update() method on a signal in Angular,
  // it automatically passes the current value of the signal
  // as an argument to the function inside update().

/* 
  without using signals, the completed state of a task can be toggled as follows:
  toggleComplete(): void {
    //get().value is used here because completed state is stored within a form control
    this.task.completed = !this.taskForm.get('completed')?.value;
    this.completedChanged.emit(this.task)
  }
*/
