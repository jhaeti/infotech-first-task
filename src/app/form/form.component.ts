import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(),
  });
  users: {
    value: string;
    viewValue: string;
  }[] = [
    { value: '1', viewValue: 'Ti Jhae' },
    { value: '2', viewValue: 'Alhassan' },
    { value: '3', viewValue: 'Tijani' },
  ];

  // Injecting data service
  constructor(private dataService: DataService) {}

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
}
