import { Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements  OnInit, OnDestroy {

  searchForm:FormGroup;
  searchControl:FormControl;


  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.showPopup(2,event);
    event.stopPropagation()  
  }


  showList:boolean =  false;
  result:string[] = [];

  data:string[] = [
    "Youtube",
    "Youtube Channel",
    "Facebook"
  ]
  

  constructor(private formBuilder:FormBuilder){
    this.showList = false;
  }

  ngOnInit() {
      this.searchForm = this.formBuilder.group({
        searchControl:''
      })
      this.data = []
      this.onChange()
      this.data = [
        "Youtube",
        "Youtube Channel",
        "Facebook"
      ]
  }

  onChange(){
    let re = "";
     this.searchForm.valueChanges
      .pipe(
        debounceTime(500), // Wait 500ms after each keystroke
        distinctUntilChanged(), // Only emit if the value has changed
        switchMap(value => {
          console.log(value.searchControl);
          re = '';
           this.data.push(this.result[0])
          return value.searchControl
          }) // call serch api
      ).subscribe(result =>{
      })

  }

  showPopup(id, event){
    if(id == 1) {
      this.showList = true;
      event.stopPropagation()
    } else {
      this.showList = false;
    }
  }

  ngOnDestroy(): void {
      this.result = null;
  }

}
