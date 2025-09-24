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

  activeSection = signal('home');
  private observer!: IntersectionObserver;
  private isScrollingManually = false;

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  // This is now the central handler for all scroll requests
  handleScrollToSection(sectionId: string): void {
    this.isScrollingManually = true;
    this.activeSection.set(sectionId); // Set active link immediately

    this.router.navigate([], { fragment: sectionId, replaceUrl: true });
    this.scroller.scrollToAnchor(sectionId);

    // After a delay, allow the observer to take over again
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
      if (this.isScrollingManually) {
        return; // Ignore observer events during manual scroll
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
