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
  private apiService = inject(ApiService);
  // skills = toSignal(this.apiService.getSkills());

  // Use writable signals to store the profile and skills data
  profile: WritableSignal<Profile | undefined> = signal(undefined);
  skills: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
    // Fetch the data and set the signals' values when the component loads
    this.apiService.getProfile().subscribe(profileData => {
      this.profile.set(profileData);
      console.log('Profile fetched:', profileData);
    });

    this.apiService.getSkills().subscribe(skillsData => {
      this.skills.set(skillsData);
      console.log('Skills fetched:', skillsData);
    });
  }

  // Example of how you might update the bio
  updateBio(): void {
    const newBio = prompt("Enter a new bio:");
    if (newBio) {
      this.apiService.updateProfile({ bio: newBio }).subscribe(() => {
        // After updating, refetch the profile and set the signal with the new data
        this.apiService.getProfile().subscribe(profileData => {
          this.profile.set(profileData);
        });
      });
    }
  }
}
