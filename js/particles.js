/**
 * Arpit Rathi Portfolio - Interactive Particle Background
 * Restrained, aesthetic constellation canvas with subtle glowing nodes.
 */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.animationFrameId = null;
    this.isRunning = true;
    
    this.config = {
      particleColor: 'rgba(163, 230, 53, 0.45)', // Electric lime
      secondaryColor: 'rgba(74, 222, 128, 0.35)', // Spring mint
      lineColor: 'rgba(74, 222, 128, 0.08)',
      maxDistance: 130,
      baseSpeed: 0.35,
      densityDivisor: 18000 // Controls particle count dynamically based on screen area
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    const area = this.width * this.height;
    // Restrained count: between 25 and 55 particles for clean elegance
    const count = Math.min(55, Math.max(25, Math.floor(area / this.config.densityDivisor)));

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.baseSpeed,
        vy: (Math.random() - 0.5) * this.config.baseSpeed,
        radius: Math.random() * 1.8 + 1.0,
        isSecondary: Math.random() > 0.5,
        alpha: Math.random() * 0.4 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Pause when tab not visible to save GPU/battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameId);
      } else {
        this.isRunning = true;
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    const pLen = this.particles.length;

    for (let i = 0; i < pLen; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Wrap boundaries smoothly
      if (p.x < -10) p.x = this.width + 10;
      else if (p.x > this.width + 10) p.x = -10;

      if (p.y < -10) p.y = this.height + 10;
      else if (p.y > this.height + 10) p.y = -10;

      // Mouse gentle interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 0.6;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.isSecondary ? this.config.secondaryColor : this.config.particleColor;
      this.ctx.fill();

      // Connect lines to nearby particles
      for (let j = i + 1; j < pLen; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.maxDistance) {
          const opacity = (1 - dist / this.config.maxDistance) * 0.14;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Auto-instantiate once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particles-canvas');
});
