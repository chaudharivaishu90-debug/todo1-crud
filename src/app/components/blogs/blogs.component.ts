
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IBlog } from 'src/app/model/blogsinterface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  @ViewChild('TitleRef') titleref!: ElementRef;
  @ViewChild('contentRef') contentref!: ElementRef;
  @ViewChild('AuthorRef') authorref!: ElementRef;
  @ViewChild('categoryRef') categoryref!: ElementRef;

  IsinEditMode: boolean = false;
  isDeleteMode:boolean=false;
id!: string;
  blogsArr: Array<IBlog> = [
    {
      id: "111",
      title: "Introduction to Angular",
      content: "Angular is a TypeScript-based frontend framework used to build dynamic web applications.",
      author: "Vaishali",
      category: "Technology"
    },
    {
      id: "112",
      title: "Learning JavaScript",
      content: "JavaScript is a programming language used to create interactive web pages.",
      author: "Rahul",
      category: "Programming"
    },
    {
      id: "113",
      title: "Getting Started with Node.js",
      content: "Node.js is a JavaScript runtime environment used to build backend applications.",
      author: "Pranjali",
      category: "Backend"
    }
  ];

  constructor(
    private snackbar: SnackbarService,
    private uuid: UuidService
  ) { }

  ngOnInit(): void {
  }

  trackById(index: number, item: IBlog): string {
    return item.id;
  }

  Addtodo() {

    let blog: IBlog = {
      id: this.uuid.getuuid(),
      title: this.titleref.nativeElement.value,
      content: this.contentref.nativeElement.value,
      author: this.authorref.nativeElement.value,
      category: this.categoryref.nativeElement.value
    };

    this.blogsArr.push(blog);

    this.titleref.nativeElement.value = '';
    this.contentref.nativeElement.value = '';
    this.authorref.nativeElement.value = '';
    this.categoryref.nativeElement.value = '';

    this.snackbar.showSnackbar('New blog created');
  }

EditBlogs(blog:IBlog){
 let edobj= this.blogsArr.find(t=>t.id===blog.id);
  this.titleref.nativeElement.value=edobj!.title;
    this.authorref.nativeElement.value=edobj!.author;
  this.categoryref.nativeElement.value=edobj!.category;
  this.contentref.nativeElement.value=edobj!.content;

  this.IsinEditMode=true;
  this.id=blog.id

}


updatBlog(){
  let ubobj:IBlog={
        title:this.titleref.nativeElement.value,
        content:this.contentref.nativeElement.value,
          author:this.authorref.nativeElement.value,
        category:this.categoryref.nativeElement.value,
        id:this.id
  }
  let index= this.blogsArr.findIndex(t=>t.id===this.id)
  this.blogsArr[index]=ubobj;
  this.IsinEditMode=false;
  this.titleref.nativeElement.value='';
  this.contentref.nativeElement.value='';
  this.authorref.nativeElement.value='';
  this.categoryref.nativeElement.value='';
  this.id='';
    this.snackbar.showSnackbar('Blog updated sucsesfully!!');
    
}

  onDeleteblog(id:string){
    let confirmation=confirm("are you sure to remove")
    if(confirmation){
    let index= this.blogsArr.findIndex(t=> t.id===id)
    this.blogsArr.splice(index,1)
        this.snackbar.showSnackbar('blogs Removed sucsesfully!!');

    }
  }
}
