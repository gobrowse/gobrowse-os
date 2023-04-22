/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BootScreen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("boot", "./BootScreen/costumes/boot.svg", {
        x: 121.5,
        y: 36.5
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.costume = "boot";
    yield* this.wait(2);
    this.broadcast("desktop");
    this.visible = false;
  }

  *whenIReceiveShutdown() {
    this.moveAhead();
    this.visible = true;
  }
}
