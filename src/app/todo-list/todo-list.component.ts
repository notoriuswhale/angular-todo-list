import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  subscription: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription = this.todoService.todos.subscribe((todos) => {
      this.todos = todos;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
