import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  @Input() activeSection: string = 'home';
  @Output() sectionClicked = new EventEmitter<string>();

  onNavLinkClick(sectionId: string): void {
    this.sectionClicked.emit(sectionId);
  }
}
