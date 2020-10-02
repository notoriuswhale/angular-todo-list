import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Todo, TodoFilters, TodoSort } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[];
  private filters: TodoFilters;
  private sortData: TodoSort;
  private todosSubj: BehaviorSubject<Todo[]>;
  todos: Observable<Todo[]>;

  constructor() {
    this.getTodosFromLocalStorage();
    this.todosSubj = new BehaviorSubject<Todo[]>(this._todos);
    this.todos = this.todosSubj
      .asObservable()
      .pipe(
        tap(this.saveTodosToLocalStorage),
        map(this.filterTodos.bind(this)),
        map(this.sortTodos.bind(this))
      );
  }

  addTodo(task: string, date: string) {
    const newTodos = [...this._todos];
    newTodos.push({
      id: this.genId(),
      task,
      date: new Date(date),
      done: false,
    });
    this._todos = newTodos;
    this.updateTodos();
  }

  deleteTodo(id: number) {
    this._todos = this._todos.filter((todo) => todo.id !== id);
    this.updateTodos();
  }

  toogleDone(id: number) {
    this._todos = this._todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else {
        return todo;
      }
    });
    this.updateTodos();
  }

  setFilters(filters: TodoFilters) {
    this.filters = filters;
    this.updateTodos();
  }

  setSort(data: TodoSort) {
    this.sortData = data;

    this.updateTodos();
  }

  getTodosFromLocalStorage() {
    let todos: Todo[] = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      todos = todos.map((todo) => {
        todo.date = new Date(todo.date);
        return todo;
      });
    }
    this._todos = todos || [];
  }

  saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private updateTodos() {
    this.todosSubj.next(this._todos);
  }

  private filterTodos(todos: Todo[]) {
    const filters = this.filters;
    if (!filters || (!filters.filterText.trim() && !filters.filterDate)) {
      return todos;
    }

    let newTodos = [...todos];
    newTodos = newTodos.filter((todo) => {
      let textResult = todo.task.search(filters.filterText.trim()) !== -1;
      let dateResult =
        todo.date.toISOString().split('T')[0] === filters.filterDate;
      if (!filters.filterDate) dateResult = true;
      if (!filters.filterText.trim()) textResult = true;
      return textResult && dateResult;
    });

    return newTodos;
  }

  private sortTodos(todos: Todo[]) {
    const sortData = this.sortData;
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
    if (!this._todos.length) {
      return 1;
    }
    return this._todos[this._todos.length - 1].id + 1;
  }
}
