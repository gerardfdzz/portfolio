import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  i18n = inject(I18nService);
  displayedText = signal('');

  private typewriterInterval: ReturnType<typeof setInterval> | null = null;
  private animFrame: number | null = null;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private visibilityObserver: IntersectionObserver | null = null;

  private readonly resizeHandler = () => {
    this.resizeCanvas();
    this.createParticles();
  };

  readonly techBadges = ['Angular 17', 'TypeScript', 'NgRx', 'RxJS', 'GitFlow', 'SCRUM'];

  constructor() {
    effect(() => {
      const t = this.i18n.t();
      if (!t) return;
      const role = t.hero.role;

      untracked(() => {
        if (this.typewriterInterval) {
          clearInterval(this.typewriterInterval);
          this.typewriterInterval = null;
        }
        this.displayedText.set('');
        this.startTypewriter(role);
      });
    });
  }

  ngOnInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    window.removeEventListener('resize', this.resizeHandler);
    this.visibilityObserver?.disconnect();
  }

  private startTypewriter(text: string) {
    let i = 0;
    setTimeout(() => {
      this.typewriterInterval = setInterval(() => {
        if (i < text.length) {
          this.displayedText.update(current => current + text[i]);
          i++;
        } else {
          if (this.typewriterInterval) {
            clearInterval(this.typewriterInterval);
            this.typewriterInterval = null;
          }
        }
      }, 80);
    }, 400);
  }

  private initCanvas() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const start = () => {
      this.resizeCanvas();
      this.createParticles();
      this.setupVisibilityPause();
      this.animateParticles();
      window.addEventListener('resize', this.resizeHandler);
    };

    if ('requestIdleCallback' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).requestIdleCallback(start, { timeout: 1000 });
    } else {
      setTimeout(start, 100);
    }
  }

  private setupVisibilityPause() {
    const section = this.canvasRef.nativeElement.closest('section');
    if (!section) return;

    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (this.animFrame) {
            cancelAnimationFrame(this.animFrame);
            this.animFrame = null;
          }
        } else if (!this.animFrame) {
          this.animateParticles();
        }
      },
      { threshold: 0 }
    );

    this.visibilityObserver.observe(section);
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles() {
    this.particles = [];
    const density = window.innerWidth < 768 ? 30 : 15;
    const count = Math.floor(window.innerWidth / density);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private animateParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
      this.ctx.fill();
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animFrame = requestAnimationFrame(() => this.animateParticles());
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}
