import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  // controls.enabled = false;

  // controls.enabled = false is the same as the 3 lines below

  // controls.enableRotate = false;
  // controls.enableZoom = false;
  // controls.enablePan = false;

  // enable arrow keys
  controls.listenToKeyEvents(window);

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;

  // min/max zoom
  controls.minDistance = 5;
  controls.maxDistance = 20;

  // min/max horizontal rotation
  controls.minAzimuthAngle = -Infinity; // default
  controls.maxAzimuthAngle = Infinity; // default

  // min/max vertical rotation
  controls.minPolarAngle = 0; // default
  controls.maxPolarAngle = Math.PI; // default

  controls.tick = () => controls.update();

  // controls.saveState();

  // // sometime later:
  // controls.reset();

  // controls.dispose();

  return controls;
}

export { createControls };