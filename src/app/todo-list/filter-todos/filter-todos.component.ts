import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-filter-todos',
  templateUrl: './filter-todos.component.html',
  styleUrls: ['./filter-todos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTodosComponent implements OnInit, OnDestroy {
  filters = this.fb.group({
    filterText: [''],
    filterDate: [''],
  });

  formSubscription: Subscription;

  constructor(private todoService: TodoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formSubscription = this.filters.valueChanges.subscribe((value) => {
      this.todoService.setFilters(value);
    });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  resetFilters() {
    this.filters.reset();
  }
}
