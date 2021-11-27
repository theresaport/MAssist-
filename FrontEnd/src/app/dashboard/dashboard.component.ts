import {
  Component,
  EventEmitter,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BookService } from '../book.service';
import { Book } from './../models/book.model';
import { Marketer } from './../models/marketer.model';
import { ColDef } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subMarketers!: Subscription;
  subTitles!: Subscription;
  selectedTitle: Partial<Book> = {};
  columnDefsMarketAnalysts: ColDef[] = [
    { field: 'Id', hide: true },
    { field: 'FirstName', sortable: true, filter: true },
    { field: 'LastName', sortable: true, filter: true },
    { field: 'Active', sortable: true, filter: true },
  ];

  columnDefsTitles: ColDef[] = [
    { field: 'Id', hide: true },
    { field: 'Title', sortable: true, filter: true },
    { field: 'ISBN', sortable: true, filter: true },
    { field: 'AuthorFirstName', sortable: true, filter: true },
    { field: 'AuthorLastName', sortable: true, filter: true },
    {
      field: 'PublishDate',
      sortable: true,
      filter: true,
      cellRenderer: (data) => {
        return formatDate(data.value, 'MM/dd/yyyy', this.locale);
      },
    },
  ];

  rowDataMarketAnalysts: Marketer[] = [];
  rowDataTitles: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.subMarketers = this.bookService
      .getMarketerWithNoAssignments()
      .subscribe({
        next: (data) => {
          this.rowDataMarketAnalysts = data;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.subTitles = this.bookService.getBooks().subscribe({
      next: (data) => {
        this.rowDataTitles = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onRowClicked(event: any) {
    this.selectedTitle = event.data;
    this.router.navigate(['/titleInfo', event.data.Id]);
  }

  ngOnDestroy(): void {
    this.subMarketers.unsubscribe();
    this.subTitles.unsubscribe();
  }
}
