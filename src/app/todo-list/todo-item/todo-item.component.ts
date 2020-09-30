import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/todo.model';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  date: Date = new Date();
  constructor(private todoService: TodoService) {}

  onDelete() {
    console.log('asd');
    this.todoService.deleteTodo(this.todo.id);
  }

  toogleDone() {
    this.todoService.toogleDone(this.todo.id);
  }

  ngOnInit(): void {}
}
