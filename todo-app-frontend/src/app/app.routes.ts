import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'todos', component: TodoComponent }, 
];
