import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
 
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://8080-ecdfcdadbbadefcbfefdfaeebfcdfbcdeff.premiumproject.examly.io';
 
  constructor(private http: HttpClient) {}
 
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
 
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback, { headers: this.getAuthHeaders() });
  }
 
  getAllFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Feedback[]>(url, { headers: this.getAuthHeaders() });
  }
 
  deleteFeedback(feedbackId: string): Observable<void> {
    const url = `${this.apiUrl}/${feedbackId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }
 
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}