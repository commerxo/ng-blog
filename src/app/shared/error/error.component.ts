import { Component, Input } from '@angular/core';
import { APIError } from 'src/app/models/api-error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass', './error.component.css']
})
export class ErrorComponent {

  @Input("error") apiError:APIError; ;
}
