/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class OsLogo extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("os logo", "./OsLogo/costumes/os logo.svg", {
        x: 99.64999389648435,
        y: 79.5
      })
    ];

    this.sounds = [new Sound("pop", "./OsLogo/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "settings" },
        this.whenIReceiveSettings
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close files" },
        this.whenIReceiveCloseFiles
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveSettings() {
    this.visible = true;
  }

  *whenIReceiveCloseFiles() {
    this.visible = false;
  }
}
