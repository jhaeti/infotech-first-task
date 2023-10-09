import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-cell',
  templateUrl: './user-cell.component.html',
  styleUrls: ['./user-cell.component.css'],
})
export class UserCellComponent implements OnInit, OnDestroy {
  @Input() userId: number;
  userNameSub: Subscription;
  name: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userNameSub = this.dataService
      .getUserById(this.userId)
      .subscribe((name) => {
        this.name = name;
      });
  }

  ngOnDestroy(): void {
    this.userNameSub.unsubscribe();
  }
}
