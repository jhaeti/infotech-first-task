import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { PostModel } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(),
  });
  usersSub: Subscription;
  users: {
    value: string;
    viewValue: string;
  }[];

  // Injecting data service
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.usersSub = this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  save() {
    const newPost = new PostModel(
      +this.postForm.value.userId,
      this.postForm.value.title,
      this.postForm.value.body
    );
    // Sending post through data service
    this.dataService.sendPost(newPost);
    // Resetting form state
    this.postForm.reset();
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}
