import {ToastrService} from 'ngx-toastr';
import {ServiceService} from './../../service.service';
import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  constructor(private route: Router,private service: ServiceService,private routes: ActivatedRoute,private toastr: ToastrService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getCoustomerDetails();
    },100);
  }
  id: any
  coustomerArray: any
  nameCoust: any;
  readmore = false;
  displayMainQue(event: any) {
    console.log(event);

    this.selectedMenu = event
  }
  displayMainQueFollow(event: any) {
    console.log(event);

    this.selectedMenu = event
  }
  getCoustomerDetails() {
    let obj = localStorage.getItem('coustomerID')

    console.log(obj);
    this.service.getCoustomer(obj).subscribe(
      (res: any) => {
        this.coustomerArray = res.result
        this.nameCoust = res.result.name
        console.log(res.result);
        this.routeToLogin(res)

      },
      (err) => {
        console.log(err.error.message);

      }
    )
  }
  image: any
  onSelectimg(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        const imgg: any = event.target.result;
        this.image = imgg;
        console.log(imgg);
        let valueChnage
        valueChnage = {...this.coustomerArray,image: imgg}
        console.log(valueChnage);

        this.service.editCoustomer(valueChnage).subscribe((response: any) => {
          console.log(response);
          this.coustomerArray = response.result
          this.toastr.success('Image Updated ')
        },(error) => {
          console.log(error);

        })
        // this.index = this.data.indexOf(obj)
        // console.log(this.index);

        // this.modiimg(obj,imgg,this.index)
      };
    }
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
  routeToLogin(err: any) {
    if (err.message === 'No token provided.') {
      this.route.navigate(['/'])
    }
  }
  postCreate(val: any) {
    let array = this.coustomerArray.post.push(val)
    console.log(array);

    let valueChange = {...this.coustomerArray,post: array}
    console.log(valueChange);
    // this.service.editCoustomer(this.coustomerArray).subscribe((response) => {
    //   console.log(response);

    // },(error) => {
    //   console.log(error);

    // })
  }
  selectedMenu = 0
  menues = [{name: 'View Posts'},{name: 'Create Post'},{name: 'Followers'},{name: 'Following'},{name: 'Archives'}]
  setClickedMenu(i: any) {
    this.selectedMenu = i
  }
  deletePost(index: any) {
    this.coustomerArray.post.splice(index,1)
    console.log(this.coustomerArray.post);

    let valueSend = {...this.coustomerArray,post: this.coustomerArray.post}
    console.log(this.coustomerArray.post,valueSend);

    this.service.editCoustomer(valueSend).subscribe((response) => {
      console.log(response);
      this.toastr.warning('Post Deleted')
    },
      (error) => {
        console.log(error);

      })
  }
}
