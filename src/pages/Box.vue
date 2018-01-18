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
    scene.clearColor = new BABYLON.Color3.Red()

    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene)    
    const box = BABYLON.MeshBuilder.CreateBox('box', { height: 1, width: 0.75, depth: 0.25 }, scene) 

    const material = new BABYLON.StandardMaterial('mat', scene)
    material.diffuseColor = BABYLON.Color3.Green()
    box.material = material
    
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