import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public apiUrl = "https://8080-aaaecbbaabdabcdaaadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io"

  constructor(private http: HttpClient) { }
 

}
