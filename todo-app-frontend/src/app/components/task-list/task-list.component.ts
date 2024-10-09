import { Component, OnInit, signal } from '@angular/core';
import { Task, TaskService } from '../../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    console.log(this)
  }

  ngOnInit(): void {
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
    
    // Add task and update the signal
    this.taskService.addTask(newTask).subscribe((task) => {
      this.tasks.update((tasks) => [...tasks, task]); // Updating signal using update()
      this.taskForm.reset();
    });
  }

  getTasks(): void {
    // Fetch tasks and set them in the signal
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks); // Setting the signal's value
    });
  }

  onCompletedChanged(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; 
    console.log('Input value:', inputValue);
  }
}
