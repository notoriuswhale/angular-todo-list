import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  subscription: Subscription;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}
}
