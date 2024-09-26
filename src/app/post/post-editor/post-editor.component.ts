import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.sass']
})
export class PostEditorComponent implements OnInit {
  dropdownList:any = [];
  // selectedItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Java' },
      { item_id: 2, item_text: 'Spring Boot' },
      { item_id: 3, item_text: 'Html' },
      { item_id: 4, item_text: 'Css' },
      { item_id: 5, item_text: 'JavaScript' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3,

    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
