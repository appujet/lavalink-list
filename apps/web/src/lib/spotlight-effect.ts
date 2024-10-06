export default class Spotlight {
    private container: HTMLElement;
    private cards: HTMLElement[];
    private mouse: { x: number; y: number };
    private containerSize: { w: number; h: number };

    constructor(containerElement: HTMLElement) {
        this.container = containerElement;
        this.cards = Array.from(this.container.children) as HTMLElement[];
        this.mouse = {
            x: 0,
            y: 0,
        };
        this.containerSize = {
            w: 0,
            h: 0,
        };
        this.initContainer = this.initContainer.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.init();
    }

    private initContainer(): void {
        this.containerSize.w = this.container.offsetWidth;
        this.containerSize.h = this.container.offsetHeight;
    }

    private onMouseMove(event: MouseEvent): void {
        const { clientX, clientY } = event;
        const rect = this.container.getBoundingClientRect();
        const { w, h } = this.containerSize;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const inside = x < w && x > 0 && y < h && y > 0;
        if (inside) {
            this.mouse.x = x;
            this.mouse.y = y;
            this.cards.forEach((card) => {
                const cardX = -(card.getBoundingClientRect().left - rect.left) + this.mouse.x;
                const cardY = -(card.getBoundingClientRect().top - rect.top) + this.mouse.y;
                card.style.setProperty('--mouse-x', `${cardX}px`);
                card.style.setProperty('--mouse-y', `${cardY}px`);
            });
        }
    }

    private init(): void {
        this.initContainer();
        window.addEventListener('resize', this.initContainer);
        window.addEventListener('mousemove', this.onMouseMove);
    }
}