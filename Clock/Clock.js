/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Clock extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Clock/costumes/costume1.svg", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Clock/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenGreenFlagClicked() {
    if (this.arrayIncludes(this.stage.vars.username, /* no username */ "")) {
      null;
    } else {
      this.stage.vars.username.push(/* no username */ "");
    }
  }

  *whenIReceiveDesktop() {
    this.stage.watchers.clock.visible = true;
    while (true) {
      this.stage.vars.clock =
        this.toString(new Date().getHours()) +
        (":" +
          this.toString(new Date().getMinutes()) +
          (":" + this.toString(new Date().getSeconds())));
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.stage.watchers.clock.visible = false;
  }

  *whenIReceiveShutdown() {
    this.stage.watchers.clock.visible = false;
  }
}
