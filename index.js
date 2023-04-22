import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import BootScreen from "./BootScreen/BootScreen.js";
import PexelsSimonBerger1323550 from "./PexelsSimonBerger1323550/PexelsSimonBerger1323550.js";
import Taskbar from "./Taskbar/Taskbar.js";
import Clock from "./Clock/Clock.js";
import Meneu from "./Meneu/Meneu.js";
import Notepad from "./Notepad/Notepad.js";
import Chat from "./Chat/Chat.js";
import Terminal from "./Terminal/Terminal.js";
import Files from "./Files/Files.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Mouse from "./Mouse/Mouse.js";
import Settings from "./Settings/Settings.js";
import MoreApps from "./MoreApps/MoreApps.js";
import Lists from "./Lists/Lists.js";
import WebBrowser from "./WebBrowser/WebBrowser.js";
import OsLogo from "./OsLogo/OsLogo.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  BootScreen: new BootScreen({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 90,
    visible: true,
    layerOrder: 17
  }),
  PexelsSimonBerger1323550: new PexelsSimonBerger1323550({
    x: 0,
    y: 11,
    direction: 90,
    costumeNumber: 1,
    size: 130,
    visible: false,
    layerOrder: 1
  }),
  Taskbar: new Taskbar({
    x: -5,
    y: -161,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Clock: new Clock({
    x: 23,
    y: 23,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Meneu: new Meneu({
    x: -11,
    y: 26,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Notepad: new Notepad({
    x: -53,
    y: -149,
    direction: 90,
    costumeNumber: 1,
    size: 30,
    visible: false,
    layerOrder: 16
  }),
  Chat: new Chat({
    x: 177,
    y: -148,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 15
  }),
  Terminal: new Terminal({
    x: 62,
    y: -149,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 14
  }),
  Files: new Files({
    x: 6,
    y: -149,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 12
  }),
  Sprite1: new Sprite1({
    x: 5,
    y: -7,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Sprite2: new Sprite2({
    x: 140,
    y: 95,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 8
  }),
  Mouse: new Mouse({
    x: -177.99999999999997,
    y: 179.99999999999997,
    direction: -45,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 10
  }),
  Settings: new Settings({
    x: -176,
    y: -155,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 13
  }),
  MoreApps: new MoreApps({
    x: -190,
    y: -157,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 5
  }),
  Lists: new Lists({
    x: -114,
    y: -149,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 11
  }),
  WebBrowser: new WebBrowser({
    x: 115,
    y: -154,
    direction: 90,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 9
  }),
  OsLogo: new OsLogo({
    x: -2,
    y: -61,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 7
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
