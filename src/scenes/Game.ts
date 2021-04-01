import { AScene } from "./AScene";
import { Player, Direction } from "../objects/Player";
import { AnimatedSprite, BitmapText, Sprite, Texture, TilingSprite,  } from "pixi.js";
import  sound from "pixi-sound";
import { Main } from "..";
import { AObject } from "../objects/AObject";
import { Enemy } from "../objects/Enemy";
import { Maths } from "../utils/Maths";
import { groupEnd } from "console";
import gsap, { Circ } from "gsap";
import { loadOptions } from "@babel/core";

export class Game extends AScene {
    private _time = 0;

    private _objects: AObject[] = [];

    private _instruction = false;

    private _instructionalreadyshown= false;

    private _player = new Player(Texture.from("NinjaAttaque-2.png"));

    private _win = false;

    private _ground: TilingSprite;

    private _ninja = AnimatedSprite.fromFrames(["MarcheNinja-0.png", "MarcheNinja-1.png", "MarcheNinja-2.png", "MarcheNinja-3.png", "MarcheNinja-4.png", "MarcheNinja-5.png", "MarcheNinja-6.png"]);

    private _Aninja = AnimatedSprite.fromFrames(["NinjaAttaque-0.png","NinjaAttaque-1.png", "NinjaAttaque-2.png", "NinjaAttaque-3.png", "NinjaAttaque-4.png"]);

    private _Mninja = AnimatedSprite.fromFrames(["MortNinja-0.png","MortNinja-1.png", "MortNinja-2.png"]);

    private _enemy = AnimatedSprite.fromFrames (["ChampiWalk1.png", "ChampiWalk2.png", "ChampiWalk3.png", "ChampiWalk4.png"]);
    
    private _Denemy = AnimatedSprite.fromFrames (["ChampiDeath1.png", "ChampiDeath2.png","ChampiDeath3.png", "ChampiDeath4.png"]);

    private _paysage : TilingSprite;

    private _onKeyboard(kEvt: KeyboardEvent) {
        if (kEvt.key == "Up") this._player.direction = kEvt.type == "keydown" ? Direction.Up : Direction.Idle;
        else if (kEvt.key == "ArrowRight")
            this._player.direction = kEvt.type == "keydown" ? Direction.Right : Direction.Idle;
}

    constructor() {
        super();


        sound.Sound.from({
            url: 'assets/Musique/Schizo.mp3',
            autoPlay: true,
            complete: function() {
            }
        });

        

        this._ground = new TilingSprite(Texture.from("ground.jpg"), 1620,100);
        this._ground.y = Main.SCREEN_HEIGHT - this._ground.height;
        this.addChild(this._ground)

        this._paysage = new TilingSprite(Texture.from("Paysage.png"), 5000,570);
        this._paysage.y = 20 ;
        this.addChild(this._paysage)
       
        this._ninja.x = - 800;
        this._ninja.y = 264.5;
        this.addChild(this._ninja);
        this._ninja.animationSpeed = 0.1;
        this._ninja.play();

        this._enemy.x = 1000;
        this._enemy.y = 400;
        this.addChild(this._enemy);
        this._enemy.animationSpeed = 0.1;
        this._enemy.play();


        gsap.to(this._ninja, {duration:3, x : Main.SCREEN_WIDTH / 4, ease:Circ.easeOut});
       
        this.spawnEnemy();

    }

 public update(timeDelta: number) {
    super.update(timeDelta);

    //condition de mort//
    this._ground.tilePosition.x -= 1;

    this._enemy.x -= 0;
    // Arrêter toutes les actions à l'écran et écrire en gros "Clique droit pour frapper l'adversaire" avec un icone de clique droit//

    this._enemy.x -= 1;
    if (this._enemy.x < Main.SCREEN_WIDTH)
        Main.instance.stage.emit("GAME_OVER");

    //this._ninja.x += 1;
    if (this._ninja.x > Main.SCREEN_WIDTH)
        Main.instance.stage.emit("GAME_OVER");

    

 
 }

}

public spawnEnemy() {
    setInterval(() => {
        let enemy = AnimatedSprite.fromFrames(["ChampiWalk1.png", "ChampiWalk2.png", "ChampiWalk3.png", "ChampiWalk4.png"]);
        enemy.x=Main.SCREEN_WIDTH+100;
        enemy.y=Main.SCREEN_HEIGHT-191;
        enemy.animationSpeed=0.1;
        enemy.scale.set(1,3);
        enemy.scale.x*=-1;

        enemy.play();
        this.addChild(enemy);
        this._enemy.push(enemy);
    }, 3000);
}
