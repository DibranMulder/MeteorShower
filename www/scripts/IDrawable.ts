interface IDrawable {
    displayObject: PIXI.Container;
    disappearing: boolean;
    paint(animationAgeInMs: number): void;
    collisionOccured(): void;
} 