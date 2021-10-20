export class ShortifyResponse {
  id: string;
  url: string;

  constructor(url: string, id: string) {
    this.url = url;
    this.id = id
  }
}
