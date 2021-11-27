import { MarketMaterial } from '../../app/models/market-material.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { MarketMaterialAssignemnt } from './../models/market-material-assignemnt.model';
import { NotificationService } from './../../app/notification.service';

@Component({
  selector: 'app-add-market-material',
  templateUrl: './add-market-material.component.html',
  styleUrls: ['./add-market-material.component.css'],
})
export class AddMarketMaterialComponent implements OnInit {
  @Input() bookId: number;
  @Output() public linkedClicked = new EventEmitter<String>();

  marketMaterial = {} as MarketMaterial;
  marketMaterialAssignment = {} as MarketMaterialAssignemnt;
  marketMaterials: any; //= [{}] as [MarketMaterial];
  submitted = false;
  StartDt: any;
  appDialogTitle = 'Market Assistant';

  constructor(
    private bookService: BookService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMakterMaterials();
  }

  getMakterMaterials() {
    this.bookService.getMarketMaterials().subscribe(
      (response) => {
        this.marketMaterials = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Market Material assigned to title successfully.',
      this.appDialogTitle
    );
  }

  showInfo() {
    this.notifyService.showInfo(
      'Data removed successfully !!',
      this.appDialogTitle
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.marketMaterialAssignment.BookId = this.bookId;
    this.bookService
      .createMarketMaterialAssignment(this.marketMaterialAssignment)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.showToasterSuccess();
          this.linkedClicked.emit('addedmm');
        },
        (err) => {
          console.log('status code ->' + err.status);
          this.notifyService.showError('Error', this.appDialogTitle);
        }
      );
  }
}
function input() {
  throw new Error('Function not implemented.');
}
function appDialogTitle(arg0: string, appDialogTitle: any) {
  throw new Error('Function not implemented.');
}
