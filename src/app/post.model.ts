export class PostModel {
  constructor(
    public userId: number,
    public title: string,
    public body: string,
    public id?: number
  ) {}
}
