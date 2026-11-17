
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo1 } from '../../model/todo1interface';
import { UuidService } from 'src/app/services/uuid.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-todo1',
  templateUrl: './todo1.component.html',
  styleUrls: ['./todo1.component.scss']
})
export class Todo1Component implements OnInit {

  @ViewChild('todoname')
  todonameRef!: ElementRef;

  IsinEditMode: boolean = false;

  todoarr: Array<Itodo1> = [
    {
      todoname: 'Angular',
      todoId: '111'
    },
    {
      todoname: 'Js',
      todoId: '112'
    }
  ];

  constructor(
    private snackbar: SnackbarService,
    private uuid: UuidService
  ) { }

  ngOnInit(): void {
  }

  onAddtodo() {

    let todo: Itodo1 = {
      todoname: this.todonameRef.nativeElement.value,
      todoId: this.uuid.getuuid()
    };

    this.todoarr.push(todo);

    this.todonameRef.nativeElement.value = '';

    this.snackbar.showSnackbar('New todo created');
  }
}
