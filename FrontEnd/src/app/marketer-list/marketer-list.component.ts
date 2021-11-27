import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Marketer } from './../models/marketer.model';
import { ColDef } from 'ag-grid-community';
import { CreateTitleComponent } from '../create-title/create-title.component';
import { TitleInfoComponent } from './../title-info/title-info.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marketer-list',
  templateUrl: './marketer-list.component.html',
  styleUrls: ['./marketer-list.component.css'],
})
export class MarketerListComponent implements OnInit {
  title = 'Marketer List';
  //router: any;
  // selectedTitle: Book = [];
  selectedMarketer: Partial<Marketer> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    // this.router = rout;
  }

  columnDefs: ColDef[] = [
    { field: 'Id', hide: true },
    { field: 'EmployeeId' },
    { field: 'FirstName', sortable: true, filter: true },
    { field: 'LastName', sortable: true, filter: true },
    { field: 'Active', sortable: true, filter: true },
  ];
  rowData: Marketer[] = [];

  ngOnInit() {
    this.bookService.getMarketers().subscribe(
      (response) => {
        this.rowData = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // this.router.navigate(['details', id]);
  onRowClicked(event: any) {
    this.selectedMarketer = event.data;
    console.log(event.data.Id);
    this.router.navigate(['/titleInfo', event.data.Id]);
  }
}
