/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Chat extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("My project-1(3)", "./Chat/costumes/My project-1(3).png", {
        x: 360,
        y: 360
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.watchers.chat.visible = false;
    this.visible = false;
    this.stage.vars.closeApps = 0;
  }

  *whenIReceiveDesktop() {
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

  *whenthisspriteclicked() {
    this.broadcast("chat");
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }
}
