/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Taskbar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Taskbar/costumes/costume1.svg", {
        x: 237.5,
        y: 39.78334045410162
      })
    ];

    this.sounds = [new Sound("pop", "./Taskbar/sounds/pop.wav")];

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
    this.visible = true;
  }

  *whenIReceiveShutdown() {
    this.visible = false;
  }
}
