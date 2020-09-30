import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, TodoFilters, TodoSort } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[];
  private filters: TodoFilters;
  private sortData: TodoSort;
  private todosSubj: BehaviorSubject<Todo[]>;

  constructor() {
    this.getTodosFromLocalStorage();
    this.todosSubj = new BehaviorSubject<Todo[]>(this._todos);
  }

  getTodos(): BehaviorSubject<Todo[]> {
    return this.todosSubj;
  }

  addTodo(task: string, date: string) {
    this._todos.push({
      id: this.genId(),
      task,
      date: new Date(date),
      done: false,
    });
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

  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }

  private updateTodos() {
    this.saveTodosToLocalStorage();
    let newTodos = [...this._todos];
    const filters = this.filters;
    const sortData = this.sortData;

    if (filters && (filters.filterText.trim() || filters.filterDate)) {
      newTodos = newTodos.filter((todo) => {
        let textResult = todo.task.search(filters.filterText.trim()) !== -1;
        let dateResult =
          todo.date.toISOString().split('T')[0] === filters.filterDate;

        if (!filters.filterDate) dateResult = true;
        if (!filters.filterText.trim()) textResult = true;
        return textResult && dateResult;
      });
    }

    //sorting
    if (sortData) {
      if (sortData.method === 'asc') {
        newTodos.sort(this.ascSort(sortData.prop));
      }
      if (sortData.method === 'desc') {
        newTodos.sort(this.descSort(sortData.prop));
      }
    }

    this.todosSubj.next(newTodos);
  }

  private ascSort(prop) {
    return (a, b) => {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
      return 0;
    };
  }
  private descSort(prop) {
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
