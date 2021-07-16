import {ToastrService} from 'ngx-toastr';
import {ServiceService} from 'src/app/service.service';
import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {

  constructor(private service: ServiceService,private toastr: ToastrService) {}

  ngOnInit(): void {

    this.getAllCousumer()
  }
  arrayFollow: any;
  getAllCousumer() {
    this.service.getAllCoustomers().subscribe((res) => {
      console.log(res);
      this.arrayFollow = res.result
      this.followButtonValueCh()

    },
      (err) => {
        console.log(err);

      })
  }
  @Input() coustomerArray: any
  @Output() displayMainQue = new EventEmitter<string>();
  @Input() selectedMenu: any;
  selectedMenuadd: any;
  followButton = false;
  arrayFollowData: any
  mainvalue = [{
    name: '',image: '',followButton: false,_id: '',post: []
  }];
  followButtonValueCh() {
    console.log(this.arrayFollow,this.coustomerArray);

    for (let index = 0; index < this.arrayFollow.length; index++) {
      this.followButton = false;
      const elementarray = this.arrayFollow[index];
      if (this.selectedMenu.length > 0) {
        for (let ind = 0; ind < this.selectedMenu.length; ind++) {
          const element = this.selectedMenu[ind];
          if (elementarray._id === element) {
            this.followButton = true
            this.arrayFollowData = [{...this.arrayFollow[index],'followButton': true}]
            console.log(this.arrayFollow);
            this.mainvalue[index] = {...this.arrayFollow[index],'followButton': true}
          }
          else if (this.selectedMenu.length - 1 == ind && !this.followButton) {
            this.arrayFollowData = [{...this.arrayFollow[index],'followButton': false}]
            this.mainvalue[index] = {...this.arrayFollow[index],'followButton': false}

          }
          console.log(this.mainvalue)

        }
      } else {
        this.mainvalue[index] = {...this.arrayFollow[index],'followButton': false}

      }


    }

    // followButton = false;

  }
  follower(id: any) {
    this.coustomerArray.followerID.push(id)
    let valueSend = {
      ...this.coustomerArray,followerID: this.coustomerArray.followerID
    }
    console.log(this.coustomerArray.post,valueSend);

    this.service.editCoustomer(valueSend).subscribe((res) => {
      console.log(res);
      this.selectedMenuadd = 0
      this.toastr.success("Now Your Are following")
      // this.displayMainQue.emit(this.selectedMenuadd);
      this.getAllCousumer()
    },(err) => {
      console.log(err);

    })
  }

  Unfollower(id: any) {
    this.coustomerArray.followerID.splice(id,1)
    let valueSend = {
      ...this.coustomerArray,followerID: this.coustomerArray.followerID
    }
    console.log(this.coustomerArray.post,valueSend);

    this.service.editCoustomer(valueSend).subscribe((res) => {
      console.log(res);
      this.selectedMenuadd = 0

      // this.displayMainQue.emit(this.selectedMenuadd);
      this.getAllCousumer()
    },(err) => {
      console.log(err);

    })
  }
}
