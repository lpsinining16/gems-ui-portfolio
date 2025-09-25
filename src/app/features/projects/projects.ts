import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, Card],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects implements OnInit {
  public apiService = inject(ApiService);
  
  ngOnInit(): void {

  }
}
