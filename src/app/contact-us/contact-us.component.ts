import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.sass'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  emailId: FormControl;
  subject: FormControl;
  message: FormControl;

  constructor(private contactService:ContactService){}

  ngOnInit(): void {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.emailId = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]);
    this.subject = new FormControl('', Validators.required);
    this.message = new FormControl('', [
      Validators.required,
      Validators.minLength(50),
    ]);
  }

  createForm() {
    this.contactForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      subject: this.subject,
      message: this.message,
    });
  }

  registerAndSaveQuery(){
    this.contactService.raiseQuery(this.contactForm.value).subscribe((response)=>{
      
    },(error)=>{

    })
  }
}
