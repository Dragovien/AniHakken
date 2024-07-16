<template>
  <Renderer ref="renderer" resize antialias :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }">
    <Camera :position="{ z: 10 }" />
    <Scene background="#000000" >
      <AmbientLight :intensity="0.5" />
      <PointLight :position="{ y: 50, z: 0 }" />
      <PointLight color="#ff6000" :intensity="0.75" :position="{ y: -50, z: 0 }" />
      <Sphere ref="mesh" :radius="2.5" :width-segments="200" :height-segments="200" >
        <StandardMaterial :props="{ displacementScale: 0.2 }">
          <Texture src="src/assets/textures/Wood_Tiles_002_basecolor.jpg" />
          <Texture src="src/assets/textures/Wood_Tiles_002_height.png" name="displacementMap" />
          <Texture src="src/assets/textures/Wood_Tiles_002_normal.jpg" name="normalMap" />
          <Texture src="src/assets/textures/Wood_Tiles_002_roughness.jpg" name="roughnessMap" />
          <Texture src="src/assets/textures/Wood_Tiles_002_ambientOcclusion.jpg" name="aoMap" />
        </StandardMaterial>
      </Sphere>
    </Scene>
  </Renderer>
</template>

<script>
import { defineComponent } from 'vue'
import { AmbientLight, Camera, Renderer, PointLight, Scene, Sphere, StandardMaterial, Texture } from 'troisjs';

export default defineComponent({
  name: 'TroisJSPage',
  data() {
    return {}
  },
  components: {
    AmbientLight, Camera, Renderer, PointLight, Scene, Sphere, StandardMaterial, Texture
  },
})
</script>

<style scoped>

</style>