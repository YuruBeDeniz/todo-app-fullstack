import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export type Task = {
    _id?: string;
    title: string;
    completed: boolean;
}

@Injectable({providedIn: 'root'})

export class TaskService {
  apiUrl = 'http://localhost:5005/api/tasks';

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTasks(): Observable<Task[]> { 
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, task);
  }

  getTaskDetails(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/task-details/${taskId}`);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}