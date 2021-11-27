import { Marketer } from '../../app/models/marketer.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { MarketerAssignemnt } from './../models/marketer-assignemnt.model';
import { NotificationService } from './../../app/notification.service';
import { GlobalConstants } from './../../app/common/global-constants';

@Component({
  selector: 'app-add-analyst',
  templateUrl: './add-analyst.component.html',
  styleUrls: ['./add-analyst.component.css'],
})
export class AddAnalystComponent implements OnInit {
  @Input() bookId: number;
  @Output() public analystAdded = new EventEmitter<String>();
  marketer = {} as Marketer;
  marketerAssignment = {} as MarketerAssignemnt;
  marketers: any;

  submitted = false;
  StartDt: any;
  appDialogTitle = GlobalConstants.siteTitle;
  constructor(
    private bookService: BookService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMarketers();
  }
  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Marketer assiged to title successfully.',
      this.appDialogTitle
    );
  }
  showInfo() {
    this.notifyService.showInfo(
      'Data removed successfully !!',
      this.appDialogTitle
    );
  }

  getMarketers() {
    this.bookService.getMarketers().subscribe(
      (response) => {
        this.marketers = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  save() {
    this.marketerAssignment.BookId = this.bookId;
    this.bookService
      .createMarketerAssignment(this.marketerAssignment)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.showToasterSuccess();
          this.analystAdded.emit('addedma');
        },
        (err) => {
          console.log('status code ->' + err.status);
          this.notifyService.showError('Error', this.appDialogTitle);
        }
      );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
