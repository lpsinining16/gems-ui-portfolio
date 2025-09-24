import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  // Use an Output to communicate with the parent layout component
  @Output() sectionClicked = new EventEmitter<string>();

  // This method now just emits the ID of the section to scroll to
  onButtonClick(sectionId: string): void {
    this.sectionClicked.emit(sectionId);
  }
}
