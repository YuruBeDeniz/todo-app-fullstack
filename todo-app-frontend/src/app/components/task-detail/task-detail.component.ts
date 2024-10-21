import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task, TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  task!: Task;
  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskService.getTaskDetails(taskId).subscribe((task) => {
        this.task = task;
        console.log(this.task);
      });
    }
  }
}
