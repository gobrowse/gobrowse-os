/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lists extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Lists/costumes/costume1.svg", { x: 45, y: 45 })
    ];

    this.sounds = [new Sound("pop", "./Lists/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stop list" },
        this.whenIReceiveStopList
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
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

  *whenIReceiveStopList() {
    this.stage.watchers.list.visible = false;
  }

  *whenthisspriteclicked() {
    this.stage.vars.closeApps = 0;
    this.broadcast("list");
    this.stage.watchers.list.visible = true;
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.closeApps = 0;
    this.stage.vars.list = [];
    this.stage.watchers.list.visible = false;
    this.visible = false;
  }
}
