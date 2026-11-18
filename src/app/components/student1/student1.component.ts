import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Inewstudent } from '../../model/studentinterface';
import { UuidService } from 'src/app/services/uuid.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-student1',
  templateUrl: './student1.component.html',
  styleUrls: ['./student1.component.scss']
})
export class Student1Component implements OnInit {

  @ViewChild('Firstnameref') Firstnameref!: ElementRef;
  @ViewChild('Lastnameref') Lastnameref!: ElementRef;
  @ViewChild('RollNoref') RollNoref!: ElementRef;
  @ViewChild('Classref') Classref!: ElementRef;
  @ViewChild('isActiveref') isActiveref!: ElementRef;

  isInEditMode: boolean = false;
  editId!: string;

  stdArr: Array<Inewstudent> = [
    {
      Firstname: "Om",
      LastName: "More",
      RollNo: "11",
      Class: "A",
      isActive: true,
      StdId: "001"
    },

    {
      Firstname: "Swati",
      LastName: "Maajan",
      RollNo: "12",
      Class: "B",
      isActive: false,
      StdId: "002"
    },

    {
      Firstname: "Radhika",
      LastName: "Kale",
      RollNo: "13",
      Class: "B",
      isActive: false,
      StdId: "003"
    }
  
  ];

  constructor(
    private UuidService: UuidService,
    private SnackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}
   trackByStdId(index:number,std:Inewstudent){

   }

  // add

  OnAddstd(){
    let newstd:Inewstudent={
      Firstname:this.Firstnameref.nativeElement.value,
      LastName:this.Lastnameref.nativeElement.value,
      RollNo:this.RollNoref.nativeElement.value,
      Class:this.Classref.nativeElement.value,
      isActive:this.isActiveref.nativeElement.value==='Yes',
      StdId:this.UuidService.getuuid()
    }

    this.stdArr.unshift(newstd)
    this.Firstnameref.nativeElement.value='';
    this.Lastnameref.nativeElement.value='';
    this.RollNoref.nativeElement.value='';
    this.Classref.nativeElement.value='';
    this.isActiveref.nativeElement.value==='Yes',
    this.SnackbarService.showSnackbar('new student added')

  }

// edit

  onEditstd(std:Inewstudent){
      this.editId = std.StdId;

    let edobj= this.stdArr.find(t=>t.StdId===this.editId)
      this.Firstnameref.nativeElement.value=std.Firstname;
      this.Lastnameref.nativeElement.value=std.LastName;
      this.RollNoref.nativeElement.value=std.RollNo;
            this.Classref.nativeElement.value=std.Class;
            this.isActiveref.nativeElement.value=std.isActive? 'Yes' :'No';
            this.isInEditMode=true;



  }


  //updtae
  onupdateStd(){
    let ubobj:Inewstudent={
      Firstname:this.Firstnameref.nativeElement.value,
      LastName:this.Lastnameref.nativeElement.value,
        RollNo:this.RollNoref.nativeElement.value,
      Class:this.Classref.nativeElement.value,
      isActive:this.isActiveref.nativeElement.value==='Yes',
      StdId:this.editId
}
let index= this.stdArr.findIndex(t=>t.StdId===this.editId)
this.stdArr[index]=ubobj;
this.isInEditMode=false;
this.Firstnameref.nativeElement.value='';
this.Lastnameref.nativeElement.value='';
this.RollNoref.nativeElement.value='';
this.Classref.nativeElement.value='';
this.isActiveref.nativeElement.value='Yes';
this.editId='';
this.SnackbarService.showSnackbar(`Student data updated sucsessfully!!`);  }
  



//delete
  onRemovestd(std:Inewstudent){
    let confirmation=confirm(`are you sure to remove stdudent data??`)
    if(confirmation){
      let index=this.stdArr.findIndex(t=>t.StdId===std.StdId)
      this.stdArr.splice(index,1)
      this.SnackbarService.showSnackbar('student data removed succesfully!!!')

    }

  }
}