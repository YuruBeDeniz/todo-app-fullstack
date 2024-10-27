import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  outputs: ['completedChanged']
})
export class TaskListComponent {
  tasks = signal<Task[]>([]);
  taskForm!: FormGroup;
  errorMessage: string = '';

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    //console.log(this)
    /* console.log(TaskService)
    console.log(FormBuilder)
    console.log(formBuilder) */
  }

  ngOnInit(): void {
    //initilize form group inside ngOnInit so that:
    //the form is set up only after all necessary components and services are available.
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.getTasks();
  }

  addTask(): void {
    const newTask: Task = {
      title: this.taskForm.value.title,
      completed: false
    };
    
    // Add task to database and update the signal
    this.taskService.addTask(newTask).subscribe({
      next: (task) => {
        this.tasks.update((tasks) => [...tasks, task]);
        this.taskForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Error adding task.';
        console.error(err);
      },
      complete: () => {
        console.log('Add task request completed.');
      }
    });
  }

  getTasks(): void {
    // Fetch tasks and set them in the signal
    this.taskService.getTasks().subscribe({
      next: (tasks) => { 
        this.tasks.set(tasks); // set the signal's value
      },
      error: (err) => {
        this.errorMessage = 'Error fetching task.';
        console.error(err)
      }
    });
  }

  onCompletedChanged(task: Task): void {
    this.taskService.updateTask(task).subscribe();
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; 
    console.log('Input value:', inputValue);
  }

  onDeleteTask(id: string): void {
    if(!id) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log("Task deleted successfully");
        this.getTasks();
      },
      error: (err) => {
        this.errorMessage = "Error deleting task";
        console.error(err);
      }
    });
  }
}
