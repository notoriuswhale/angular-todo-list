import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  newTodo = {
    task: '',
    date: new Date().toISOString().split('T')[0],
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(form.valid);
    if (form.valid && this.newTodo.task.trim()) {
      this.todoService.addTodo(this.newTodo.task, this.newTodo.date);
      form.reset({
        task: '',
        date: new Date().toISOString().split('T')[0],
      });
    } else {
      form.controls.task.markAsTouched();

      this.newTodo.task = '';
    }
  }
}
