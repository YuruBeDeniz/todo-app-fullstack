import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'todos', component: TodoListComponent }, 
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/task-details/:taskId', component: TaskDetailComponent }, 
    {path: '**', component: PageNotFoundComponent}
];
