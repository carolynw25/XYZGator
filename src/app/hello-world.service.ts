// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HelloWorldService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
//CEN3031 NOTE: commented out bc gave errors
//import 'rxjs/add/operator/map';

@Injectable()
export class HelloWorldService {

  constructor() { }

  getTitle() {
    
  }

}