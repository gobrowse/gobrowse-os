/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PexelsSimonBerger1323550 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "pexels-simon-berger-1323550",
        "./PexelsSimonBerger1323550/costumes/pexels-simon-berger-1323550.png",
        { x: 480, y: 356 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveDesktop() {
    while (true) {
      this.moveBehind();
      this.visible = true;
      yield;
    }
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }
}
