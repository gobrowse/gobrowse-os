/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "list" }, this.whenIReceiveList),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stop list" },
        this.whenIReceiveStopList
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "notepad" },
        this.whenIReceiveNotepad
      ),
      new Trigger(Trigger.BROADCAST, { name: "chat" }, this.whenIReceiveChat),
      new Trigger(
        Trigger.BROADCAST,
        { name: "terminal" },
        this.whenIReceiveTerminal
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "chat terminal" },
        this.whenIReceiveChatTerminal
      )
    ];

    this.vars.closeApps = 0;
    this.vars.deleteListClose = 0;
    this.vars.clock = "10:35:3";
    this.vars.username2 = "GobrowseOS";
    this.vars.control = 1;
    this.vars.list = ["close"];
    this.vars.notepad = [];
    this.vars.chat = [
      "GobrowseOS is online",
      "GobrowseOS says: close",
      "GobrowseOS is offline"
    ];
    this.vars.terminal = ["shutdown"];
    this.vars.username = ["GobrowseOS"];

    this.watchers.clock = new Watcher({
      label: "clock",
      style: "large",
      visible: false,
      value: () => this.vars.clock,
      x: 437,
      y: 178
    });
    this.watchers.username2 = new Watcher({
      label: "username",
      style: "large",
      visible: false,
      value: () => this.vars.username2,
      x: 378,
      y: 67
    });
    this.watchers.list = new Watcher({
      label: "List",
      style: "normal",
      visible: false,
      value: () => this.vars.list,
      x: 309,
      y: 141,
      width: 257,
      height: 244
    });
    this.watchers.notepad = new Watcher({
      label: "notepad",
      style: "normal",
      visible: false,
      value: () => this.vars.notepad,
      x: 351,
      y: 157,
      width: 246,
      height: 270
    });
    this.watchers.chat = new Watcher({
      label: "Chat",
      style: "normal",
      visible: false,
      value: () => this.vars.chat,
      x: 257,
      y: 146,
      width: 443,
      height: 296
    });
    this.watchers.terminal = new Watcher({
      label: "Terminal",
      style: "normal",
      visible: false,
      value: () => this.vars.terminal,
      x: 351,
      y: 151,
      width: 257,
      height: 266
    });
  }

  *clear() {
    if (this.answer === "Clear") {
      this.vars.chat = [];
      this.vars.chat.push(/* no username */ "" + " is online");
    }
    if (this.answer === "clear") {
      this.vars.chat = [];
      this.vars.chat.push(/* no username */ "" + " is online");
    }
    if (this.vars.chat.length === 10) {
      this.vars.chat = [];
      this.vars.chat.push(/* no username */ "" + " is online");
    }
    if (this.answer === "close" || this.answer === "Close") {
      this.vars.chat.push(/* no username */ "" + " is offline");
      this.watchers.chat.visible = false;
      this.vars.deleteListClose =
        this.indexInArray(this.vars.chat, "close") + 1;
      this.vars.chat.splice(
        this.itemOf(this.vars.chat, this.vars.deleteListClose - 1) - 1,
        1
      );
      this.vars.closeApps = 1;
    }
  }

  *whenGreenFlagClicked() {
    this.watchers.chat.visible = false;
  }

  *whenIReceiveList() {
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      yield* this.askAndWait("Add To List");
      this.vars.list.push(this.answer);
      yield* this.check();
      yield;
    }
  }

  *whenIReceiveStopList() {
    this.vars.closeApps = 1;
  }

  *whenIReceiveNotepad() {
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      yield* this.askAndWait("Type");
      this.vars.notepad.push(this.answer);
      yield* this.check();
      yield;
    }
  }

  *whenIReceiveChat() {
    this.watchers.chat.visible = true;
    this.vars.chat.push(/* no username */ "" + " has joined the chat");
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      yield* this.askAndWait(
        /* no username */ "" + ", Type here! Type Clear to clear the chat! "
      );
      this.vars.chat.push(/* no username */ "" + " says: " + this.answer);
      yield* this.clear();
      yield;
    }
  }

  *check() {
    this.vars.deleteListClose = 0;
    if (this.answer === "Close" || this.answer === "close") {
      this.vars.closeApps = 1;
      this.broadcast("stop list");
      this.watchers.notepad.visible = false;
      this.vars.deleteListClose =
        this.indexInArray(this.vars.notepad, "close") + 1;
      this.vars.notepad.splice(
        this.itemOf(this.vars.notepad, this.vars.deleteListClose - 1) - 1,
        1
      );
    }
    if (this.answer === "clear" || this.answer === "Clear") {
      this.vars.notepad = [];
    }
    if (
      this.arrayIncludes(this.vars.notepad, "Close") ||
      this.arrayIncludes(this.vars.notepad, "close")
    ) {
      this.vars.deleteListClose =
        this.toBoolean(this.indexInArray(this.vars.notepad, "Close") + 1) ||
        this.toBoolean(this.indexInArray(this.vars.notepad, "close") + 1);
      this.vars.notepad.splice(this.vars.deleteListClose - 1, 1);
    }
  }

  *whenIReceiveTerminal() {
    this.vars.terminal = [];
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      yield* this.askAndWait("type commands");
      this.vars.terminal.push(this.answer);
      yield* this.terrminalDef();
      yield;
    }
  }

  *terrminalDef() {
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      if (this.answer === "open chat" || this.answer === "Open Chat") {
        this.broadcast("chat terminal");
        this.watchers.chat.visible = true;
        this.watchers.terminal.visible = false;
        this.vars.chat.push(/* no username */ "" + " has joined the chat");
        return;
      }
      if (this.answer === "open notepad" || this.answer === "Open Notepad") {
        this.watchers.notepad.visible = true;
        this.watchers.terminal.visible = false;
        this.broadcast("notepad");
        return;
      }
      if (
        this.answer === "Open List" ||
        this.answer === "Open List" ||
        this.answer === "open tasks" || this.answer === "open Tasks"
      ) {
        this.watchers.list.visible = true;
        this.watchers.terminal.visible = false;
        this.broadcast("list");
        return;
      }
      if (this.answer === "Shutdown" || this.answer === "shutdown") {
        this.broadcast("shutdown");
      }
      if (this.answer === "open files" || this.answer === "Open Files") {
        this.broadcast("files");
        this.watchers.terminal.visible = false;
        return;
      }
      if (this.answer === "Close" || this.answer === "close") {
        this.watchers.terminal.visible = false;
        this.vars.closeApps = 1;
        return;
      }
      yield;
    }
  }

  *whenIReceiveChatTerminal() {
    while (!(this.toNumber(this.vars.closeApps) === 1)) {
      yield* this.askAndWait(
        /* no username */ "" + ", Type here! Type Clear to clear the chat! "
      );
      this.vars.chat.push(/* no username */ "" + " says: " + this.answer);
      yield* this.clear();
      yield;
    }
  }
}
