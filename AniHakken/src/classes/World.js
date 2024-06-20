import { createCamera } from "src/threeJS/components/camera"
import { createScene } from "src/threeJS/components/scene"
import { createCube } from "src/threeJS/components/cube"
import { createLight, createLights } from "src/threeJS/components/lights"
import { createControls } from "src/threeJS/systems/controls";


import { createRenderer } from "src/threeJS/systems/renderer"
import { Resizer } from "./Resizer"
import {Loop} from "./Loop"

let camera;
let scene;
let renderer;
let loop;


class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);

    const cube = createCube();
    const { ambientLight, mainLight } = createLights();


    controls.addEventListener("change", () => {
      this.render();
    });


    loop.updatables.push(controls);

    scene.add(ambientLight, mainLight, cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  start() {
    loop.start();
  }

  end() {
    loop.stop();
  }

  render() {
    renderer.render(scene, camera);
  }
}

export {World}