import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { APIResponse } from 'src/app/models/api-response';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit{

  subscriberForm:FormGroup;
  emailId:FormControl;
  email:string;

  constructor(private subscriberService:SubscriberService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.createFormControl()    
  }

  createFormControl(){
    this.emailId = new FormControl("", [
      Validators.required,
      Validators.email
    ])

    this.subscriberForm = new FormGroup({
      emailId:this.emailId
    })
  }

  subscribe(){
    
    this.subscriberService.subscribe(this.subscriberForm.get("emailId").value).subscribe((response:APIResponse<Subscriber>)=>{
      if(response.status==201){
        this.toastr.success("Successfully Subscribed");
        this.subscriberForm.reset();
      }
    },(error)=>{
      console.error("Error")
    })
  }

}
