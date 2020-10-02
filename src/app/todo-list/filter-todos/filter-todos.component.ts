import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-filter-todos',
  templateUrl: './filter-todos.component.html',
  styleUrls: ['./filter-todos.component.css'],
})
export class FilterTodosComponent implements OnInit {
  filters = {
    filterText: '',
    filterDate: '',
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onChange() {
    this.todoService.setFilters(this.filters);
  }

  resetFilters() {
    this.filters = {
      filterText: '',
      filterDate: '',
    };
    this.todoService.setFilters(null);
  }
}
