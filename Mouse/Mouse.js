/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mouse extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Mouse/costumes/costume1.svg", {
        x: 1.454331194966045,
        y: 1.2753808317774542
      })
    ];

    this.sounds = [new Sound("pop", "./Mouse/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      this.move(Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y) / 3);
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.moveAhead();
      yield;
    }
  }
}
