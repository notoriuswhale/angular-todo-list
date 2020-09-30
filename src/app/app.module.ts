import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoService } from './shared/todo.service';
import { FilterTodosComponent } from './todo-list/filter-todos/filter-todos.component';
import { FilterTodo } from './shared/filter-todo.pipe';
import { SortTodosComponent } from './todo-list/sort-todos/sort-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    TodoListComponent,
    TodoItemComponent,
    FilterTodosComponent,
    FilterTodo,
    SortTodosComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
