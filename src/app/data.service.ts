import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { Subject, Subscription, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  posts: PostModel[];
  postsChange = new Subject<PostModel[]>();
  postsSubscription: Subscription;

  // Inject httpClient
  constructor(private http: HttpClient) {}

  // Fetch post from endpoint
  fetchPost() {
    this.http
      .get<PostModel[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((response) => {
        this.posts = response;
        // Triggering Observable for post
        this.postsChange.next([...this.posts]);
      });
  }

  getUsers() {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((response) =>
          response.map((user) => ({
            value: user.id,
            viewValue: user.name,
          }))
        )
      );
  }

  getUserById(id) {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users/' + id)
      .pipe(map((response) => response.name));
  }

  // Send Post to endpoint
  sendPost(post: PostModel) {
    this.http
      .post<PostModel>('https://jsonplaceholder.typicode.com/posts', post)
      .subscribe((response) => {
        // Updating post array
        this.posts.push(response);
        // Triggering Observable for post
        this.postsChange.next([...this.posts]);
      });
  }
}
