import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PostModel } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userId', 'title', 'body'];
  dataSource: PostModel[];
  dataSourceSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSourceSubscription = this.dataService.postsChange.subscribe(
      (response: PostModel[]) => {
        this.dataSource = response;
      }
    );

    this.dataService.fetchPost();
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
  }
}
