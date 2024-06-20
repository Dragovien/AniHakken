<template>
  <div id="scene-container"></div>
</template>

<script>
import { defineComponent } from "vue";
import * as THREE from "three";
import { World } from "../classes/World.js";

export default defineComponent({
  name: "ThreeJSPage",
  data() {
    return {

    };
  },
  methods: {
    main() {
      const container = document.getElementById("scene-container");
      const world = new World(container)
      world.start()
    },

    renderer() {
      
    },

    pointsInit() {
      
    },

    animate() {

    },
  },
  mounted() {
    this.main();
  },
});
</script>

<style lang="scss" scoped></style>
