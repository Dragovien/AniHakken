import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

function createLight() {
  const light = new DirectionalLight('white', 8)

  // move the light right, up, and towards us
  light.position.set(10, 10, 10);
  return light;
}

function createLights() {
  const ambientLight = new HemisphereLight(
  'white', // bright sky color
  'darkslategrey', // dim ground color
  5, // intensity
);;
  const mainLight = new DirectionalLight('white', 5);
  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight};
}

export { createLight, createLights };
