import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  constructor(private scroller: ViewportScroller, private router: Router) {}

  scrollToSection(sectionId: string): void {
    this.router.navigate([], {
      fragment: sectionId,
      replaceUrl: true
    });
    this.scroller.scrollToAnchor(sectionId);
  }
}
