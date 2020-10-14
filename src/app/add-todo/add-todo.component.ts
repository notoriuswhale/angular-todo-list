import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { myRequiredValidator } from '../shared/validators';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent implements OnInit {
  wasSubmitted: boolean = false;

  newTodo = this.fb.group({
    task: ['', [myRequiredValidator]],
    date: new Date().toISOString().split('T')[0],
  });

  constructor(private todoService: TodoService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  get task() {
    return this.newTodo.get('task') as FormControl;
  }

  onSubmit() {
    this.wasSubmitted = true;
    if (this.newTodo.valid) {
      this.todoService.addTodo(
        this.newTodo.value.task,
        this.newTodo.value.date
      );
      this.newTodo.reset({
        task: '',
        date: new Date().toISOString().split('T')[0],
      });

      this.wasSubmitted = false;
    }
  }
}
