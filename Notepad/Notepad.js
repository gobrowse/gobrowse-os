/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Notepad extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "My project-1 (5)",
        "./Notepad/costumes/My project-1 (5).png",
        { x: 360, y: 360 }
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
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "shutdown" },
        this.whenIReceiveShutdown
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.closeApps = 0;
    this.stage.vars.notepad = [];
    this.stage.watchers.notepad.visible = false;
    this.visible = false;
  }

  *whenIReceiveDesktop() {
    this.goto(-53, -149);
    this.visible = true;
    while (true) {
      this.moveAhead();
      if (this.touching("mouse")) {
        this.size = 35;
        yield* this.wait(1e-7);
        this.size = 40;
        while (!!this.touching("mouse")) {
          yield;
        }
      }
      if (!this.touching("mouse")) {
        this.size = 30;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.stage.watchers.notepad.visible = true;
    this.broadcast("notepad");
    this.stage.vars.closeApps = 0;
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }
}
