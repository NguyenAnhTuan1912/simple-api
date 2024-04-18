import { ExampleService } from "./example/example.service";

export class Services {
  example!: ExampleService;

  constructor() {
    this.example = new ExampleService();
  }
}