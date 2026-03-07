import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('edo_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ── Auth ─────────────────────────────────────────────────
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { username, password });
  }

  me(): Observable<any> {
    return this.http.get(`${this.base}/auth/me`, { headers: this.authHeaders() });
  }

  // ── Projects (público) ───────────────────────────────────
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/projects/`);
  }

  // ── Projects (admin) ─────────────────────────────────────
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/projects/all`, { headers: this.authHeaders() });
  }

  createProject(data: any): Observable<any> {
    return this.http.post(`${this.base}/projects/`, data, { headers: this.authHeaders() });
  }

  updateProject(id: number, data: any): Observable<any> {
    return this.http.put(`${this.base}/projects/${id}`, data, { headers: this.authHeaders() });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.base}/projects/${id}`, { headers: this.authHeaders() });
  }

  // ── Blog (público) ───────────────────────────────────────
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/blog/`);
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/blog/${id}`);
  }

  // ── Blog (admin) ─────────────────────────────────────────
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/blog/all`, { headers: this.authHeaders() });
  }

  createPost(data: any): Observable<any> {
    return this.http.post(`${this.base}/blog/`, data, { headers: this.authHeaders() });
  }

  updatePost(id: number, data: any): Observable<any> {
    return this.http.put(`${this.base}/blog/${id}`, data, { headers: this.authHeaders() });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.base}/blog/${id}`, { headers: this.authHeaders() });
  }

  // ── Contact ──────────────────────────────────────────────
  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.base}/contact/`, data);
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/contact/`, { headers: this.authHeaders() });
  }

  markRead(id: number): Observable<any> {
    return this.http.put(`${this.base}/contact/${id}/read`, {}, { headers: this.authHeaders() });
  }
}
