/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 160.90841,
        y: 131.30380499999998
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 192.29193241970006,
        y: 130.07736000656382
      }),
      new Costume("costume3", "./Sprite1/costumes/costume3.svg", {
        x: 126.6224009635973,
        y: 104.40009393431858
      }),
      new Costume("costume4", "./Sprite1/costumes/costume4.svg", {
        x: 142.15241397216272,
        y: 104.43400032119912
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "files" }, this.whenIReceiveFiles),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close files" },
        this.whenIReceiveCloseFiles
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "settings" },
        this.whenIReceiveSettings
      ),
      new Trigger(Trigger.BROADCAST, { name: "apps" }, this.whenIReceiveApps),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close apps" },
        this.whenIReceiveCloseApps
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.watchers.username2.visible = false;
    /* TODO: Implement sensing_setdragmode */ null;
    this.visible = false;
  }

  *whenIReceiveFiles() {
    this.goto(5, -7);
    this.costume = "costume1";
    this.visible = true;
    this.moveBehind(1);
  }

  *whenIReceiveCloseFiles() {
    this.visible = false;
  }

  *whenIReceiveSettings() {
    this.goto(4, 11);
    this.visible = true;
    this.costume = "costume2";
    this.stage.watchers.username2.visible = true;
  }

  *whenIReceiveApps() {
    this.visible = true;
    this.costume = "costume3";
    this.goto(-15, 25);
  }

  *whenIReceiveCloseApps() {
    this.visible = false;
  }
}
