import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Centralized data models for the application
export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1';

  // A public signal to act as a centralized store for our profile data.
  public profile = signal<Profile | undefined>(undefined);

  // This method now fetches the data and updates the signal for all components to see.
  fetchProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`).pipe(
      tap(data => this.profile.set(data)) // Update the signal with the fetched data
    );
  }

  updateProfile(profileData: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profile`, profileData).pipe(
      tap(updatedData => this.profile.set(updatedData))
    );
  }
}

