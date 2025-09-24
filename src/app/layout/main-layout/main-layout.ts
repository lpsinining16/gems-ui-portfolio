import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Header } from '../../shared/components/header/header';
import { Home } from '../../features/home/home';
import { About } from '../../features/about/about';
import { Projects } from '../../features/projects/projects';
import { Contact } from '../../features/contact/contact';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Home, About, Projects, Contact, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private router = inject(Router);
  private scroller = inject(ViewportScroller);

  // A signal to hold the ID of the currently active section
  activeSection = signal('home');
  private observer!: IntersectionObserver;
  private isScrollingManually = false;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  // This method is called when a nav link is clicked in the header
  handleScrollToSection(sectionId: string): void {
    this.isScrollingManually = true;
    this.activeSection.set(sectionId); // Immediately set the active link for instant feedback

    this.router.navigate([], { fragment: sectionId, replaceUrl: true });
    this.scroller.scrollToAnchor(sectionId);

    // After 1 second, allow the observer to take over again
    setTimeout(() => {
      this.isScrollingManually = false;
    }, 1000);
  }

  private setupIntersectionObserver(): void {
    const options = {
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      // If we are scrolling from a click, ignore observer events
      if (this.isScrollingManually) {
        return;
      }

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.activeSection.set(sectionId);
          this.router.navigate([], { fragment: sectionId, replaceUrl: true });
        }
      });
    }, options);

    const sections = this.elementRef.nativeElement.querySelectorAll('section');
    sections.forEach((section: Element) => this.observer.observe(section));
  }
}
