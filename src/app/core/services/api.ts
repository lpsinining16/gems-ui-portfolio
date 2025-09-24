import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface Profile {
  name: string;
  bio: string;
  skills: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
  }
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private http = inject(HttpClient);
  // The base URL of your new Node.js API
  private apiUrl = 'http://localhost:3000/api/v1';

  // --- Profile Methods ---
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  updateProfile(profileData: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profile`, profileData);
  }

  // --- Get Skills Method ---
  /**
   * Fetches the profile and extracts the skills array.
   * @returns An observable of a string array containing the skills.
   */
  getSkills(): Observable<string[]> {
    return this.getProfile().pipe(
      map(profile => profile.skills) // Use the map operator to transform the data
    );
  }


  // --- Project Methods ---
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }
}

