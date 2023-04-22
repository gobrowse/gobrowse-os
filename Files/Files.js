/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Files extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("My project-1(5)", "./Files/costumes/My project-1(5).png", {
        x: 360,
        y: 360
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.broadcast("files");
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }

  *whenIReceiveDesktop() {
    this.costume = "My project-1(5)";
    this.size = 55;
    this.visible = true;
    while (true) {
      this.moveAhead();
      if (this.touching("mouse")) {
        this.size = 60;
        yield* this.wait(1e-7);
        this.size = 65;
        while (!!this.touching("mouse")) {
          yield;
        }
      }
      if (!this.touching("mouse")) {
        this.size = 55;
      }
      yield;
    }
  }
}
