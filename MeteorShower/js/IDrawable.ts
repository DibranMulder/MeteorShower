interface IDrawable {
    displayObject: PIXI.DisplayObjectContainer;
    disappearing: boolean;
    paint(animationAgeInMs: number): void;
    collisionOccured(): void;
} 