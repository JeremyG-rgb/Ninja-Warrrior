import { Sprite } from "pixi.js";
import { AScene } from "./AScene";
import { Main } from "../index";
import gsap from "gsap";
export class GameOver extends AScene {

    private _music = Sprite.from("Musique.mp3");
    
    constructor() {
        super();

        const gameOver = Sprite.from("game_over.png");
        gameOver.x = (Main.SCREEN_WIDTH - gameOver.width) / 2;
        gameOver.y = (Main.SCREEN_HEIGHT - gameOver.height) / 2;
        this.addChild(gameOver);

        gameOver.interactive = true;
        gameOver.buttonMode = true;

        gsap.to(gameOver, { alpha: 0.5, duration: 0.4, repeat: -1, yoyo: true });

        gameOver.once("pointerdown", () => Main.instance.openHomeScreen());
    }
}