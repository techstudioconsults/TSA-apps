interface Mouse {
  x: number;
  y: number;
}

export function HeroCanvas(canvasElement: HTMLCanvasElement) {
  const canvas = canvasElement;
  const context = canvas.getContext("2d");

  // Set canvas dimensions to the full viewport
  const canvasHeight = window.innerHeight;
  const canvasWidth = window.innerWidth;

  canvas.width = canvasWidth * window.devicePixelRatio;
  canvas.height = canvasHeight * window.devicePixelRatio;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  let animationFrameId: number | null = null;

  // Effect class
  class Effect {
    private width: number;
    private height: number;
    private gap: number;
    public ctx: CanvasRenderingContext2D;
    public mouse: Mouse;
    private randomHighlights: Set<string> = new Set();
    private highlightInterval: ReturnType<typeof setInterval> | null = null;
    private resizeHandler: (() => void) | null = null;
    private mouseMoveHandler: ((event: MouseEvent) => void) | null = null;
    private mouseLeaveHandler: (() => void) | null = null;

    constructor(
      width: number,
      height: number,
      context: CanvasRenderingContext2D,
    ) {
      this.width = width;
      this.height = height;
      this.ctx = context;
      this.gap = 70;
      this.mouse = { x: -1, y: -1 };

      // Store handlers for cleanup
      this.resizeHandler = () => {
        const newHeight = window.innerHeight;
        const newWidth = window.innerWidth;

        canvas.width = newWidth * window.devicePixelRatio;
        canvas.height = newHeight * window.devicePixelRatio;
        this.width = canvas.width;
        this.height = canvas.height;

        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
      };

      this.mouseMoveHandler = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = (event.clientX - rect.left) * window.devicePixelRatio;
        this.mouse.y = (event.clientY - rect.top) * window.devicePixelRatio;
      };

      this.mouseLeaveHandler = () => {
        this.mouse.x = -1;
        this.mouse.y = -1;
      };

      window.addEventListener("resize", this.resizeHandler, { passive: true });
      canvas.addEventListener("mousemove", this.mouseMoveHandler, {
        passive: true,
      });
      canvas.addEventListener("mouseleave", this.mouseLeaveHandler, {
        passive: true,
      });

      this.initializeRandomHighlights();
      this.startRandomHighlighting();
    }

    initializeRandomHighlights() {
      const totalColumns = Math.floor(this.width / this.gap);
      const totalRows = Math.floor(this.height / this.gap);

      // Initially highlight a random set of grid boxes
      for (let index = 0; index < 10; index++) {
        const randomX = Math.floor(Math.random() * totalColumns) * this.gap;
        const randomY = Math.floor(Math.random() * totalRows) * this.gap;
        this.randomHighlights.add(`${randomX},${randomY}`);
      }
    }

    startRandomHighlighting() {
      this.highlightInterval = setInterval(() => {
        const totalColumns = Math.floor(this.width / this.gap);
        const totalRows = Math.floor(this.height / this.gap);

        const randomX = Math.floor(Math.random() * totalColumns) * this.gap;
        const randomY = Math.floor(Math.random() * totalRows) * this.gap;

        const key = `${randomX},${randomY}`;
        if (this.randomHighlights.has(key)) {
          this.randomHighlights.delete(key);
        } else {
          this.randomHighlights.add(key);
        }
      }, 500);
    }

    destroy() {
      // Clean up all event listeners and intervals
      if (this.highlightInterval) {
        clearInterval(this.highlightInterval);
        this.highlightInterval = null;
      }
      if (this.resizeHandler) {
        window.removeEventListener("resize", this.resizeHandler);
        this.resizeHandler = null;
      }
      if (this.mouseMoveHandler) {
        canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.mouseMoveHandler = null;
      }
      if (this.mouseLeaveHandler) {
        canvas.removeEventListener("mouseleave", this.mouseLeaveHandler);
        this.mouseLeaveHandler = null;
      }
    }

    drawGrid() {
      const mouseGridX = Math.floor(this.mouse.x / this.gap) * this.gap;
      const mouseGridY = Math.floor(this.mouse.y / this.gap) * this.gap;

      for (let x = 0; x < this.width; x += this.gap) {
        for (let y = 0; y < this.height; y += this.gap) {
          const key = `${x},${y}`;
          if (x === mouseGridX && y === mouseGridY) {
            this.ctx.fillStyle = "#72779F10";
          } else if (this.randomHighlights.has(key)) {
            this.ctx.fillStyle = "#72779F10";
          } else {
            this.ctx.fillStyle = "transparent";
          }

          this.ctx.fillRect(x, y, this.gap, this.gap);
          this.ctx.strokeStyle = "#72779F50";
          this.ctx.lineWidth = 0.1;
          this.ctx.strokeRect(x, y, this.gap, this.gap);
        }
      }
    }

    update() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
    }
  }

  const effect = new Effect(canvas.width, canvas.height, context!);

  function animate() {
    effect.update();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Return cleanup function
  return () => {
    effect.destroy();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
}
