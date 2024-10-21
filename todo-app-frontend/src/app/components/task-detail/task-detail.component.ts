import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  task!: Task;
  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService, 
    private formBuilder: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskService.getTaskDetails(taskId).subscribe((task) => {
        this.task = task;
        console.log(this.task);

        this.taskForm = this.formBuilder.group({
          title: [this.task.title],
        })
      });
    }
  }

  handleSubmit() {
    console.log(this.taskForm.value)
    const updatedTask: Task = {
      ...this.task,
      title: this.taskForm.value.title
    }

    this.taskService.updateTask(updatedTask).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/tasks'])
      },
      error: (error) => {
        console.error(error);
      } 
    })
  }
}
