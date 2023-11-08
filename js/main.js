import "../style.scss";
import { Controller } from "./controller/controller.js";
import { Model } from "./model/model.js";
import { DOMRender } from "./view/DOMRender";
import { clickEvent } from "./controller/events/clickEvent";
import { keyEvent } from "./controller/events/keyEvent.js";
import { loadedEvent } from "./controller/events/loadedEvent.js";
import { Observer } from "./controller/events/mutationObserver.js";

const dependencies = {
  controller: new Controller(),
  model: new Model(),
  view: new DOMRender(),
};

const eventInstances = [
  new clickEvent(dependencies),
  new keyEvent(dependencies),
  new loadedEvent(dependencies),
  new Observer(dependencies),
];

eventInstances.forEach((event) => event.listen());
