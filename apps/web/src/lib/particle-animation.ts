// Particle animation
export default class ParticleAnimation {
    private canvas: HTMLCanvasElement;
    private canvasContainer!: HTMLElement;
    private context!: CanvasRenderingContext2D;
    private dpr!: number;
    private settings!: { quantity: number; staticity: number; ease: number; };
    private circles: any[] = []; // You might want to define a type/interface for circle
    private mouse!: { x: number; y: number; };
    private canvasSize!: { w: number; h: number; };
    public color!: string;
    constructor(
        el: HTMLCanvasElement,
        { quantity = 30, staticity = 50, ease = 50, color = "#000000" }: { quantity?: number; staticity?: number; ease?: number; color?: string; }
    ) {
        this.canvas = el;
        if (!this.canvas) return;
        this.canvasContainer = this.canvas.parentElement!;
        this.context = this.canvas.getContext('2d')!;
        this.dpr = window.devicePixelRatio || 1;
        this.settings = {
            quantity: quantity,
            staticity: staticity,
            ease: ease,
        };
        this.color = color;
        this.circles = [];
        this.mouse = {
            x: 0,
            y: 0,
        };
        this.canvasSize = {
            w: 0,
            h: 0,
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.initCanvas = this.initCanvas.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.drawParticles = this.drawParticles.bind(this);
        this.remapValue = this.remapValue.bind(this);
        this.animate = this.animate.bind(this);
        this.init();
    }

    private init(): void {
        this.initCanvas();
        this.animate();
        window.addEventListener('resize', this.initCanvas);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    private initCanvas(): void {
        this.resizeCanvas();
        this.drawParticles();
    }
    
    private onMouseMove(event: MouseEvent): void {
        const { clientX, clientY } = event;
        const rect = this.canvas.getBoundingClientRect();
        const { w, h } = this.canvasSize;
        const x = clientX - rect.left - w / 2;
        const y = clientY - rect.top - h / 2;
        const inside =
            x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
            this.mouse.x = x;
            this.mouse.y = y;
        }
    }

    private resizeCanvas(): void {
        this.circles.length = 0;
        this.canvasSize.w = this.canvasContainer.offsetWidth;
        this.canvasSize.h = this.canvasContainer.offsetHeight;
        this.canvas.width = this.canvasSize.w * this.dpr;
        this.canvas.height = this.canvasSize.h * this.dpr;
        this.canvas.style.width = this.canvasSize.w + 'px';
        this.canvas.style.height = this.canvasSize.h + 'px';
        this.context.scale(this.dpr, this.dpr);
    }

    private circleParams(): any {
        const x = Math.floor(Math.random() * this.canvasSize.w);
        const y = Math.floor(Math.random() * this.canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const size = Math.floor(Math.random() * 2) + 1;
        const alpha = 0;
        const targetAlpha = parseFloat(
            (Math.random() * 0.6 + 0.1).toFixed(1)
        );
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    }

    private drawCircle(circle: any, color: string, update = false): void {
        
        const { x, y, translateX, translateY, size, alpha } = circle;
        this.context.translate(translateX, translateY);
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI);
        this.context.fillStyle = color; // Use the provided color
        this.context.fill();
        this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        if (!update) {
            this.circles.push(circle);
        }
    }

    private clearContext(): void {
        this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    }

    private drawParticles(): void {
        this.clearContext();
        const particleCount = this.settings.quantity;
        for (let i = 0; i < particleCount; i++) {
            const circle = this.circleParams();
            this.drawCircle(circle, this.color);
        }
    }

    private remapValue(
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ): number {
        const remapped =
            ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    }

    private animate(): void {
        this.clearContext();
        this.circles.forEach((circle, i) => {
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                this.canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                this.canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(this.remapValue(
                closestEdge,
                0,
                20,
                0,
                1
            ).toFixed(2));
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }
            circle.x += circle.dx;
            circle.y += circle.dy;
            circle.translateX +=
                (this.mouse.x / (this.settings.staticity / circle.magnetism) -
                    circle.translateX) /
                this.settings.ease;
            circle.translateY +=
                (this.mouse.y / (this.settings.staticity / circle.magnetism) -
                    circle.translateY) /
                this.settings.ease;
            // circle gets out of the canvas
            if (
                circle.x < -circle.size ||
                circle.x > this.canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > this.canvasSize.h + circle.size
            ) {
                // remove the circle from the array
                this.circles.splice(i, 1);
                // create a new circle
                const newCircle = this.circleParams();
                this.drawCircle(newCircle, this.color);
                // update the circle position
            } else {
                this.drawCircle(
                    {
                        ...circle,
                        x: circle.x,
                        y: circle.y,
                        translateX: circle.translateX,
                        translateY: circle.translateY,
                        alpha: circle.alpha,
                    },
                    this.color,
                    true,
                );
            }
        });
        window.requestAnimationFrame(this.animate.bind(this));
    }

    public destroy(): void {
        window.removeEventListener('resize', this.initCanvas);
        window.removeEventListener('mousemove', this.onMouseMove);
    }
}

