/* The ProposalService class in TypeScript is a service that handles HTTP requests related to
proposals, including creating, retrieving, deleting, and accepting proposals. */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private url = 'http://127.0.0.1:3000/proposals/'

  constructor( private http: HttpClient ) { }

  getProposalCount(id: string){
    return this.http.get<{count:number, myProposals:number}>(this.url + 'count?id=' + id);
  }

  createProposal( proposal: any ){
    return this.http.post(this.url + 'create', proposal);
  }

  getProposalsByServiceId( id: any ){
    return this.http.get(this.url + 'service/' + id);
  }

  getProposalsByUserId( id: any ){
    return this.http.get(this.url + 'my/' + id);
  }

  deleteProposal( id: any ){
    return this.http.delete(this.url + id);
  }

  acceptProposal( id: any ){
    return this.http.put(this.url + 'accept/' + id, {});
  }

}
