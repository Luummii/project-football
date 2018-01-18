<template>
  <div class="container">
    <canvas class="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'

export default {
  data () {
    return {
      
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)          
    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true) // true - действие по умолчанию для attachControl разрешены
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene)
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: .5 }, scene)

    // Зацыкленный рендеринг сцены
    engine.runRenderLoop(() => {
      scene.render()
    }) 

    window.addEventListener('resize', () => {
      engine.resize()
    }) 
  }
}
</script>

<style lang="stylus">

</style>