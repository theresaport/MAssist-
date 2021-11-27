import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TitleListComponent } from './../title-list/title-list.component';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';
import { MarketerAssignemnt } from '../models/marketer-assignemnt.model';
import { Observable } from 'rxjs';
import { AddMarketMaterialComponent } from './../market-material/add-market-material.component';
import { NotificationService } from '../notification.service';
import { GlobalConstants } from './../common/global-constants';

@Component({
  selector: 'app-title-info',
  templateUrl: './title-info.component.html',
  styleUrls: ['./title-info.component.css'],
})
export class TitleInfoComponent implements OnInit {
  bookId: number;
  marketerId: number;

  showAnlaystsAssigned: boolean = false;
  showAddAnlayst: boolean = false;
  marketerAssignments: any;

  showMarketMaterialsAssigned: boolean = false;
  showAddMarketMaterial: boolean = false;
  marketMaterialAssignments: any;

  appDialogTitle = GlobalConstants.siteTitle;

  title: Book = {
    Id: 0,
    Title: '',
    ISBN: '',
    AuthorFirstName: '',
    AuthorLastName: '',
    PublishDate: '',
  };

  selectedTitle: Book | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private notifyService: NotificationService
  ) {
    this.bookId = -1;
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['Id'];

    this.bookService.getBook(this.bookId).subscribe(
      (response) => {
        this.title = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeMarketAssignment(selectedItem: any) {}

  onButtonGroupClick($event: any) {
    let clickedElement = $event.target || $event.srcElement;

    if (clickedElement.nodeName === 'BUTTON') {
      let isCertainButtonAlreadyActive =
        clickedElement.parentElement.querySelector('.active');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.className += ' active';
    }
  }

  toggleShowHideMA() {
    this.showAnlaystsAssigned = !this.showAnlaystsAssigned;
  }

  toggleShowHideMMA() {
    this.showMarketMaterialsAssigned = !this.showMarketMaterialsAssigned;
  }

  viewMarketAnalystAssignHistory($event: any) {
    this.viewAnalystsAssignedHistory();
  }

  viewMAHistory($event: any) {
    this.viewMarketMaterialsAssignedHistory();
  }

  viewAnalystsAssignedHistory() {
    this.bookService.getMarketerAssignments(this.bookId).subscribe((result) => {
      this.marketerAssignments = result;
    });
  }

  viewMarketMaterialsAssignedHistory() {
    this.bookService
      .getMarketMaterialAssignments(this.bookId)
      .subscribe((result) => {
        console.log(result);
        this.marketMaterialAssignments = result;
      });
  }

  addAnalystToTitle() {
    this.showAddAnlayst = !this.showAddAnlayst;
  }

  removeAnalystFromTitle(selectedItem: any) {
    this.bookService
      .removeAnalystFromTitle(selectedItem.BookId, selectedItem.MarketerId)
      .subscribe(
        (data: any) => {
          this.viewAnalystsAssignedHistory();
        },
        (error) => this.handleError(error)
      );
  }

  addMarketMaterialToTitle() {
    this.showAddMarketMaterial = !this.showAddMarketMaterial;
  }
  handleError(err: any) {
    if (err != undefined && err != undefined) {
      this.notifyService.showError(err.Error, this.appDialogTitle);
    }
    this.notifyService.showError(err, this.appDialogTitle);
  }

  removeMarketMaterialAssignment(selectedItem: any) {
    this.bookService.removeMarketMaterialAssignment(selectedItem.Id).subscribe(
      (data: any) => {
        this.viewMarketMaterialsAssignedHistory();
      },
      (error) => this.handleError(error)
    );
  }

  goBack() {
    this.router.navigate(['titleList']);
  }
}
