/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite2/costumes/costume1.svg", {
        x: 23.49999999999997,
        y: 24.5
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "files" }, this.whenIReceiveFiles),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "settings" },
        this.whenIReceiveSettings
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveFiles() {
    this.visible = true;
    while (true) {
      this.moveAhead();
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.stage.watchers.username2.visible = false;
    this.broadcast("close files");
    this.visible = false;
  }

  *whenIReceiveSettings() {
    this.visible = true;
    this.moveAhead(1);
    while (true) {
      0;
      yield;
    }
  }
}
