import { Texture } from "pixi.js";
import { Main } from "..";
import { AObject } from "./AObject";

export class Player extends AObject {
    public direction = Direction.Idle;

    private _hit = false;
    get hit() {
        return this._hit;
    }
    set hit(value: boolean) {
        this.texture = Texture.from("ninja.png");
        this._hit = value;
    }

    private _speed = 1;

    constructor(texture: Texture) {
        super(texture);
    }

    function DoJump (params:type) {
        stop TreeWalker
        do DoJump
        stop DoJump
        do TreeWalker
        
    }
}

export enum Direction {
    Up,
    Idle,
    Right,
}
