/* The ServiceService class in TypeScript is an Angular service that handles HTTP requests for managing
services with methods for counting, creating, retrieving, and deleting services. */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'http://127.0.0.1:3000/services/';

  constructor( private http: HttpClient ) { }

  getServiceCount(id: string){
    return this.http.get<{count:number, myCount:number}>(this.url + 'count?id=' + id);
  }

  createService( service: any ){
    return this.http.post(this.url + 'create', service);
  }

  getServices(){
    return this.http.get(this.url + 'all');
  }

  getMyServices( id: any ){
    return this.http.get(this.url + 'my/' + id);
  }

  getServiceById( id: any ){
    return this.http.get(this.url + id);
  }

  deleteService( id: any ){
    return this.http.delete(this.url + id);
  }

}
