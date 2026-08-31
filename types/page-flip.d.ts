declare module "page-flip" {
  type FlipCorner = "top" | "bottom";
  type FlipEvent = { data: number | string; object: PageFlip };

  export class PageFlip {
    constructor(element: HTMLElement, settings: Record<string, number | string | boolean>);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    getCurrentPageIndex(): number;
    flip(page: number, corner?: FlipCorner): void;
    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    turnToPage(page: number): void;
    on(eventName: "flip" | "changeState" | "init", callback: (event: FlipEvent) => void): void;
    destroy(): void;
  }
}
