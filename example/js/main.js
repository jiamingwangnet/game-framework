import { BoxCollider } from "../../src/Components/BoxCollider.cmp.mjs";
import { Physics } from "../../src/Components/Physics.cmp.mjs";
import { Game } from "../../src/Game.mjs";
import { Block } from "../../src/GameObject/Block.gobj.mjs";
import { Player } from "./Player.gobj.mjs";
import { Vector } from "../../src/Vector.mjs";
import { AudioObj } from "../../src/GameObject/AudioObj.gobj.mjs";

const canvas = document.querySelector("#c");
const game = new Game(canvas, 120, "#000000", true);

game.__Load__ = () => {
    const player = new Player(100, 500, game, "player");
    game.AddGameObject(player);

    const floor = new Block(-10000, window.innerHeight - 40, 20000, 50, "#096e00", game, "floor");
    game.AddGameObject(floor);

    const wall = new Block(350, window.innerHeight - 220, 20, 200, "gray", game, "wall");
    game.AddGameObject(wall);

    const wall2 = new Block(330, window.innerHeight - 170, 20, 150, "gray", game, "wall2");
    game.AddGameObject(wall2);

    const wall3 = new Block(310, window.innerHeight - 120, 20, 100, "gray", game, "wall3");
    game.AddGameObject(wall3);

    const wall4 = new Block(370, window.innerHeight - 170, 20, 150, "gray", game, "wall4");
    game.AddGameObject(wall4);

    const wall5 = new Block(390, window.innerHeight - 120, 20, 100, "gray", game, "wall5");
    game.AddGameObject(wall5);

    const higherFloor = new Block(1100, window.innerHeight - 220, 500, 200, "blue", game, "higherFloor")
    game.AddGameObject(higherFloor);

    const higherFloor2 = new Block(1000, window.innerHeight - 220, 50, 50, "cyan", game, "higherFloor2")
    game.AddGameObject(higherFloor2);
    const higherFloor3 = new Block(940, window.innerHeight - 220, 50, 50, "dodgerblue", game, "higherFloor3")
    game.AddGameObject(higherFloor3);
    const higherFloor4 = new Block(880, window.innerHeight - 220, 50, 50, "navy", game, "higherFloor4")
    game.AddGameObject(higherFloor4);
    const higherFloor5 = new Block(820, window.innerHeight - 220, 50, 50, "teal", game, "higherFloor5")
    game.AddGameObject(higherFloor5);

    const image = new Block(700, window.innerHeight - 220, 50, 50, "", game, "image", "./assets/test.png");
    game.AddGameObject(image);

    const roof = new Block(450, window.innerHeight - 210, 1000, 10, "brown", game, "roof");
    game.AddGameObject(roof);

    const audio = new AudioObj("./assets/test.wav", "audio", game);
    game.AddGameObject(audio);

    game.camera.follow = player;
}

game.__Render__ = () => {

}
let leftclicked = false;
let middleclicked = false;
game.__Update__ = () => {
    const player = game.GetObject("player");
    const image = game.GetObject("image");

    if (player.GetComponent(BoxCollider).Collide(image.GetComponent(BoxCollider)).collided) {
        game.GetObject("audio").Play();
    }

    const leftDown = game.input.buttonDown[game.input.ButtonToCode("left")];
    if (leftDown) {
        if (leftDown.clicked) {
            leftclicked = true;
        }

        if (leftclicked && !leftDown.clicked) {
            const block = new Block(game.input.ScreenToWorldPosition(leftDown.position).x, game.input.ScreenToWorldPosition(leftDown.position).y, 10, 10, "red", game, "block");
            game.AddGameObject(block);
            leftclicked = false;
        }
    }

    const rightdown = game.input.buttonDown[game.input.ButtonToCode("right")];
    if (rightdown) {
        if (rightdown.clicked) {
            const x = Math.floor(Math.random() * 300);
            const y = Math.floor(Math.random() * 300);
            const w = Math.floor(Math.random() * 20) + 10;
            const h = Math.floor(Math.random() * 20) + 10;

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const block = new Block(game.input.ScreenToWorldPosition(rightdown.position).x + x, game.input.ScreenToWorldPosition(rightdown.position).y + y, w, h, `rgb(${r},${g},${b})`, game, "peepee");
            game.AddGameObject(block);
        }
    }

    const middledown = game.input.buttonDown[game.input.ButtonToCode("middle")];
    if (middledown) {
        if(middledown.clicked)
        {
            middleclicked = true;
        }

        if(middleclicked && !middledown.clicked)
        {
            const physicsBlock = new Block(game.input.ScreenToWorldPosition(middledown.position).x, game.input.ScreenToWorldPosition(middledown.position).y, 30, 30, "#00ff00", game, "block");
            physicsBlock.AddComponent(new Physics(physicsBlock, game));
            game.AddGameObject(physicsBlock);
            middleclicked = false;
        }
    }
}

game.MainLoop();

// console debug purposes
window.game = game;
window.Vector = Vector;
window.Physics = Physics;
window.BoxCollider = BoxCollider;
window.Block = Block;
window.Player = Player;