
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
  updateId:string| null=null;

  IsinEditMode: boolean = false;
  trackById(index:number,item:any):number|string{
    return item.todoId;
  }

  todoarr: Array<Itodo1> = [
    {
      todoname: 'Angular',
      todoId: '111'
    },
    {
      todoname: 'Js',
      todoId: '112'
    },
    {
      todoname: 'React',
      todoId: '113'
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



// edit
onEditTodo(todo:Itodo1){
  let edobj= this.todoarr.find(t=>t.todoId===todo.todoId);
  this.todonameRef.nativeElement.value=edobj!.todoname;
  this.IsinEditMode=true;
  this.updateId=todo.todoId
}




//update
onUpdatetodo(){
  const getindex= this.todoarr.findIndex(e=> e.todoId=== this.updateId);
  let updateValue=this.todonameRef.nativeElement.value
  this.todoarr[getindex].todoname=updateValue;
      this.snackbar.showSnackbar('todo update sucessfully!!');
      this.IsinEditMode=false;
      this.updateId=null;
      this.todonameRef.nativeElement.value='';

}

//delete
onDeletetodo(id:string){
  let getconfirmation=confirm(`Are you sure to delete this todo item with id ${id}`)
  if(getconfirmation){
    let index= this.todoarr.findIndex(t=> t.todoId===id)
    this.todoarr.splice(index,1)
          this.snackbar.showSnackbar('todo deleted sucessfully!!');

  }
}
}