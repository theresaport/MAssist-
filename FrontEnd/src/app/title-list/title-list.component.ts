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
import { ColDef } from 'ag-grid-community';
import { CreateTitleComponent } from '../create-title/create-title.component';
import { TitleInfoComponent } from './../title-info/title-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css'],
})
export class TitleListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  values = '';
  isLoading = false;
  title = 'Title List';
  startDt: any;
  endDt: any;

  selectedTitle: Partial<Book> = {};
  searchText: string = '';
  ISBN: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  columnDefs: ColDef[] = [
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
  rowData: Book[] = [];
  rowDataFilter: Book[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.bookService.getBooks().subscribe({
      next: (data) => {
        this.rowData = data;
        this.rowDataFilter = this.rowData;
        this.isLoading = false;
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

  private _listIsbnFilter = '';
  get listIsbnFilter(): string {
    return this._listIsbnFilter;
  }
  set listIsbnFilter(value: string) {
    this._listIsbnFilter = value;
    this.rowDataFilter = this.performIsbnFilter(value);
  }

  private _listTitleFilter = '';
  get listTitleFilter(): string {
    return this._listTitleFilter;
  }
  set listTitleFilter(value: string) {
    this._listTitleFilter = value;
    this.rowDataFilter = this.performTitleFilter(value);
  }

  private _listAuthorNameFilter = '';
  get listAuthorNameFilter(): string {
    return this._listAuthorNameFilter;
  }
  set listAuthorNameFilter(value: string) {
    this._listAuthorNameFilter = value;
    this.rowDataFilter = this.performAuthorNameFilter(value);
  }

  performIsbnFilter(filterBy: string): Book[] {
    //this.isLoading = true;
    filterBy = filterBy.toLocaleLowerCase();
    return this.rowData.filter((book: Book) =>
      book.ISBN.toLocaleLowerCase().includes(filterBy)
    );
  }

  performTitleFilter(filterBy: string): Book[] {
    //this.isLoading = true;
    filterBy = filterBy.toLocaleLowerCase();
    return this.rowData.filter((book: Book) =>
      book.Title.toLocaleLowerCase().includes(filterBy)
    );
  }

  performAuthorNameFilter(filterBy: string): Book[] {
    //this.isLoading = true;
    filterBy = filterBy.toLocaleLowerCase();
    return this.rowData.filter(
      (book: Book) =>
        book.AuthorFirstName.toLocaleLowerCase().includes(filterBy) ||
        book.AuthorLastName.toLocaleLowerCase().includes(filterBy)
    );
  }

  performDateRangeFilter(startDt: any, endDt: any): Book[] {
    //this.isLoading = true;
    //filterBy = filterBy.toLocaleLowerCase();
    return this.rowData.filter(
      (book: Book) =>
        Date.parse(book.PublishDate) > Date.parse(startDt) &&
        Date.parse(book.PublishDate) < Date.parse(endDt)
    );
  }

  startDateChange(event: any) {
    return this.rowData.filter(
      (book: Book) => Date.parse(book.PublishDate) > Date.parse(event.value)
    );
  }

  endDateChange(event: any) {
    return this.rowData.filter(
      (book: Book) => Date.parse(book.PublishDate) < Date.parse(event.value)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
