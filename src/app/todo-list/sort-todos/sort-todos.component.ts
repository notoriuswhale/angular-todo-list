import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-sort-todos',
  templateUrl: './sort-todos.component.html',
  styleUrls: ['./sort-todos.component.css'],
})
export class SortTodosComponent implements OnInit {
  sortIndex: number = 0;
  sortOptions = [
    { name: 'Default', data: null },
    { name: 'Aplhabetic descending', data: { prop: 'task', method: 'desc' } },
    { name: 'Aplhabetic ascending', data: { prop: 'task', method: 'asc' } },
    { name: 'Date descending', data: { prop: 'date', method: 'desc' } },
    { name: 'Date ascending', data: { prop: 'date', method: 'asc' } },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onChange() {
    console.log(this.sortIndex);
    console.log(this.sortOptions[this.sortIndex]);
    this.todoService.setSort(this.sortOptions[this.sortIndex].data);
  }
}
