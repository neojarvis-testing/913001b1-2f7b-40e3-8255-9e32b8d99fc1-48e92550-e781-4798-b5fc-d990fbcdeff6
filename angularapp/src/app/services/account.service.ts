import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  getAccountByUserId(userId: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
