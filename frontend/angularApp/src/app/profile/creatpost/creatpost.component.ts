import {ServiceService} from 'src/app/service.service';
import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-creatpost',
  templateUrl: './creatpost.component.html',
  styleUrls: ['./creatpost.component.scss']
})
export class CreatpostComponent implements OnInit {

  constructor(private toastr: ToastrService,private service: ServiceService) {}

  ngOnInit(): void {
    console.log(this.coustomerArray);

  }
  @Input() coustomerArray: any
  @Input() selectedMenu: any;
  type: any
  urls: any
  postContent = ''
  x: any
  detectFiles(event: any) {
    this.urls = [];
    this.x = event.target.files;
    const files = event.target.files;

    if (files) {
      // if (!this.validateFileUploadedFileSize(files)) {
      //   this.showError(
      //     "File is too big, Please select a file less than 10MB",
      //     ""
      //   );
      //   return;
      // }
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  checkType(type: any) {
    this.type = type;
  }
  validateFileUploadedFileSize = (files: any) => {
    const allowedFileSize = 10 * 1024 * 1024;
    for (const file of files) {
      console.log(file.size);
      if (file.size > allowedFileSize) {
        return false;
      }
    }
    return true;
  };
  removeImage(index: any) {
    this.urls.splice(index,1);
  }
  @Output() displayMainQue = new EventEmitter<string>();

  creatPost() {
    if (this.postContent === "") {
      this.toastr.clear();
      this.toastr.error("Please Write Something in Your Post","");
    } else {
      this.coustomerArray.post.push({text: this.postContent,image: this.urls})
      let valueSend = {...this.coustomerArray,post: this.coustomerArray.post}
      console.log(this.coustomerArray.post,valueSend);

      this.service.editCoustomer(valueSend).subscribe((response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.selectedMenu = 0
          console.log(this.selectedMenu);
          this.toastr.success('Post Created ')
          this.displayMainQue.emit(this.selectedMenu);
        }

      },
        (error) => {
          console.log(error);

        })

    }
  }
}
