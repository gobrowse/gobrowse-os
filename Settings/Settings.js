/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Settings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("My project-1", "./Settings/costumes/My project-1.png", {
        x: 75,
        y: 110
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenIReceiveDesktop() {
    this.visible = true;
    while (true) {
      this.moveAhead();
      if (this.touching("mouse")) {
        this.size = 60;
        yield* this.wait(1e-7);
        this.size = 70;
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
    this.stage.vars.username2 = /* no username */ "";
    this.broadcast("settings");
  }

  *whenGreenFlagClicked() {
    this.moveBehind(1);
    this.visible = false;
    this.stage.vars.closeApps = 0;
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }
}
