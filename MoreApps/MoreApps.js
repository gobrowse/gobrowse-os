/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MoreApps extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "My project-1 (2)",
        "./MoreApps/costumes/My project-1 (2).png",
        { x: 360, y: 360 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "desktop" },
        this.whenIReceiveDesktop
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenIReceiveDesktop() {}

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.stage.vars.control) === 1) {
      this.broadcast("close apps");
      yield* this.wait(0.1);
      this.stage.vars.control = 0;
    } else {
      this.broadcast("apps");
      this.stage.vars.control++;
    }
  }
}
