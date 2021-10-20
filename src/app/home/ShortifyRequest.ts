export class ShortifyRequest {
  id?: string;
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
