import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonTable, Column} from '../../../models/Table';
import {Button} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    Button,
    TooltipModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnInit {
  @Input('data') data!: any[];
  @Input('columns') columns!: Column[];
  @Input('table_name') table!: string;
  @Input(
    'actionbuttons_number'
  ) actionbutton: ButtonTable[] = [];
  @Output() buttonClick = new EventEmitter<any>();

  filteredData: any[] = [];

  ngOnInit() {
    this.filteredData = [...this.data];
  }


  filterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (!value){
      this.filteredData = [...this.data];
    }
    else{
      this.filteredData = this.data.filter((item) => {
       return Object.keys(item).some(key => {
         return String(item[key]).toLowerCase().includes(value);
        });
      });
    }
  }

  onButtonClick(item?: any) {
    this.buttonClick.emit(item);
  }

  onButtonClickadd() {
    // this.buttonClick.emit(item);
  }
}
