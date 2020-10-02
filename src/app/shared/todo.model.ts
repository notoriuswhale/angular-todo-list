type SortMethod = 'asc' | 'desc';

export interface Todo {
  id: number;
  task: string;
  date: Date;
  done: boolean;
}

export interface TodoFilters {
  filterText: string;
  filterDate: string;
}

export interface TodoSort {
  prop: string;
  method: SortMethod;
}
