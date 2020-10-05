import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/shared/todo.service';
import { TodoSort } from '../../shared/todo.model';

interface SortOption {
  name: string;
  data: TodoSort;
}

@Component({
  selector: 'app-sort-todos',
  templateUrl: './sort-todos.component.html',
  styleUrls: ['./sort-todos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTodosComponent implements OnInit, OnDestroy {
  sortIndex = new FormControl('0');
  sortSub: Subscription;
  sortOptions: SortOption[] = [
    { name: 'Default', data: null },
    { name: 'Aplhabetic descending', data: { prop: 'task', method: 'desc' } },
    { name: 'Aplhabetic ascending', data: { prop: 'task', method: 'asc' } },
    { name: 'Date descending', data: { prop: 'date', method: 'desc' } },
    { name: 'Date ascending', data: { prop: 'date', method: 'asc' } },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.sortSub = this.sortIndex.valueChanges.subscribe((index) => {
      this.todoService.setSort(this.sortOptions[index].data);
    });
  }

  ngOnDestroy() {
    this.sortSub.unsubscribe();
  }
}
