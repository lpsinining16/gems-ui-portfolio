import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Profile } from '../../core/services/api';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  public apiService = inject(ApiService);

  ngOnInit(): void {
    // Only fetch data if it hasn't been loaded yet
    if (!this.apiService.profile()) {
      this.apiService.fetchProfile().subscribe();
    }
  }

  updateBio(newBio: string): void {
    const currentProfile = this.apiService.profile();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, bio: newBio };
      this.apiService.updateProfile(updatedProfile).subscribe();
    }
  }
}
