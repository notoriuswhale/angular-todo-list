import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.model';
// Not using
@Pipe({ name: 'filterTodo', pure: false })
export class FilterTodo implements PipeTransform {
  transform(todos: Todo[], filters) {
    console.log(filters);
    if (!filters || (!filters.filterText.trim() && !filters.filterDate)) {
      return todos;
    }
    return todos.filter((todo) => {
      let textResult = todo.task.search(filters.filterText) !== -1;
      console.log(textResult);
      let dateResult =
        todo.date.toISOString().split('T')[0] === filters.filterDate;
      if (!filters.filterDate) dateResult = true;
      if (!filters.filterText.trim()) textResult = true;
      return textResult && dateResult;
    });
  }
}
