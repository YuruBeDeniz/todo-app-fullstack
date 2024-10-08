import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.getTasks();
  }

  addTask(): void {
    console.log(this.taskForm.value.title)
    const newTask: Task = {
      title: this.taskForm.value.title,
      completed: false
    };
    
    this.taskService.addTask(newTask).subscribe((task) => {
      this.tasks.push(task);
      this.taskForm.reset(); 
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggleComplete(task: Task): void {

    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }
}
