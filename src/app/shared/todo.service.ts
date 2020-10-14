import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { Todo, TodoFilters, TodoSort } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private filters = new BehaviorSubject<TodoFilters>(null);
  private sortData = new BehaviorSubject<TodoSort>(null);
  private todosSubject: BehaviorSubject<Todo[]>;
  todos: Observable<Todo[]>;

  constructor() {
    const initialTodos = this.getTodosFromLocalStorage();
    this.todosSubject = new BehaviorSubject<Todo[]>(initialTodos);
    const filterSort$ = combineLatest([this.filters, this.sortData]);
    const todos = filterSort$.pipe(
      switchMap(
        ([filters, sort]): Observable<Todo[]> => {
          return this.todosSubject
            .asObservable()
            .pipe(
              tap(this.saveTodosToLocalStorage),
              map(this.filterTodos(filters)),
              map(this.sortTodos(sort))
            );
        }
      )
    );
    this.todos = todos;
  }

  addTodo(task: string, date: string) {
    const newTodos = [...this.todosSubject.getValue()];
    newTodos.push({
      id: this.genId(),
      task,
      date: new Date(date),
      done: false,
    });
    this.updateTodos(newTodos);
  }

  deleteTodo(id: number) {
    const newTodos = this.todosSubject
      .getValue()
      .filter((todo) => todo.id !== id);
    this.updateTodos(newTodos);
  }

  toogleDone(id: number) {
    const newTodos = this.todosSubject.getValue().map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });
    this.updateTodos(newTodos);
  }

  setFilters(filters: TodoFilters) {
    this.filters.next(filters);
  }

  setSort(data: TodoSort) {
    this.sortData.next(data);
  }

  getTodosFromLocalStorage() {
    let todos: Todo[] = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      todos = todos.map((todo) => {
        todo.date = new Date(todo.date);
        return todo;
      });
    }
    return todos || [];
  }

  saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private updateTodos(newTodos: Todo[]) {
    this.todosSubject.next(newTodos);
  }

  private filterTodos(filters: TodoFilters) {
    return (todos: Todo[]) => {
      if (!filters || (!filters.filterText?.trim() && !filters.filterDate)) {
        return todos;
      }

      let newTodos = todos.filter((todo) => {
        let textResult = todo.task.search(filters.filterText.trim()) !== -1;
        let dateResult =
          todo.date.toISOString().split('T')[0] === filters.filterDate;
        if (!filters.filterDate) dateResult = true;
        if (!filters.filterText.trim()) textResult = true;
        return textResult && dateResult;
      });

      return newTodos;
    };
  }

  private sortTodos(sortData: TodoSort) {
    return (todos: Todo[]) => {
      if (!sortData) {
        return todos;
      }

      let newTodos = [...todos];

      if (sortData.method === 'asc') {
        newTodos.sort(this.ascSort(sortData.prop));
      }
      if (sortData.method === 'desc') {
        newTodos.sort(this.descSort(sortData.prop));
      }

      return newTodos;
    };
  }

  private ascSort(prop: string) {
    return (a, b) => {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
      return 0;
    };
  }
  private descSort(prop: string) {
    return (a, b) => {
      if (a[prop] < b[prop]) return 1;
      if (a[prop] > b[prop]) return -1;
      return 0;
    };
  }

  private genId(): number {
    const todosArr = this.todosSubject.getValue();
    if (!todosArr.length) {
      return 1;
    }
    return todosArr[todosArr.length - 1].id + 1;
  }
}
