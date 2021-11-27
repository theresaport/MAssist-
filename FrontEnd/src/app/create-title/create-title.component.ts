import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-title',
  templateUrl: './create-title.component.html',
  styleUrls: ['./create-title.component.css'],
})
export class CreateTitleComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCustomAction(event: any) {
    console.log(event);
    this.router
      .navigate(['/element'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
}
