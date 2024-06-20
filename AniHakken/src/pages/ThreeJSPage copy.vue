<template>
  <div id="container"></div>
</template>

<script>
import { defineComponent } from "vue";
import * as THREE from "three";

export default defineComponent({
  name: "ThreeJSPage",
  data() {
    return {
      // camera: new THREE.PerspectiveCamera(
      //   75,
      //   window.innerWidth / window.innerHeight,
      //   0.1,
      //   1000
      // ),
      // geometry: new THREE.BoxGeometry(1, 1, 1), // this is for Mesh
      // material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // this is for Mesh
      camera: new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        500
      ), // this is for Line
      geometry: new THREE.BufferGeometry(), // this is for Line
      material: new THREE.LineBasicMaterial({ color: 0x0000ff }), // this is for Line
      points: [], // this is for Line
    };
  },
  methods: {
    init() {
      this.scene = new THREE.Scene(); // scene can't be defined in data
      this.scene.background = new THREE.Color(0xffffff); // this is for Line

      // this.cube = new THREE.Mesh(this.geometry, this.material);  //this is for Mesh
      // this.scene.add(this.cube) // this is for Mesh

      this.pointsInit(); // this is for Line
      this.scene.add(this.line); // this is for Line

      // this.camera.position.z = 5; //this is for Mesh
      this.camera.position.set(0, 0, 100); //this is for Line
      this.camera.lookAt(0, 0, 0),  //this is for Line
      this.renderer(); //this is for Line
    },

    renderer() {
      this.renderer = new THREE.WebGLRenderer(); // renderer can't be defined in data
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setAnimationLoop(this.animate);
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);
    },

    pointsInit() {
      this.points.push(new THREE.Vector3(-10, 0, 0));
      this.points.push(new THREE.Vector3(0, 10, 0));
      this.points.push(new THREE.Vector3(10, 0, 0));
      this.geometry.setFromPoints(this.points);
      this.line = new THREE.Line(this.geometry, this.material);
    },

    animate() {
      // this.cube.rotation.x += 0.01; //this is for Mesh
      // this.cube.rotation.y += 0.01; //this is for Mesh
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
  },
});
</script>

<style lang="scss" scoped></style>
