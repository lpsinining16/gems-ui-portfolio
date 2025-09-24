import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { ApiService, Project } from '../../core/services/api';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Card],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects implements OnInit {
  private apiService = inject(ApiService);
  
  // Create a writable signal to hold the array of projects
  projects = signal<Project[] | undefined>(undefined);

  ngOnInit(): void {
    // Fetch the projects and set the signal's value when the data arrives
    this.apiService.getProjects().subscribe(projectdata => {
      this.projects.set(projectdata);
    });
  }
}
