<template>
  <div class="container">
    <canvas class="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-materials'
import Field from '../js/Field'

export default {
  data () {
    return {
      
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 3, Math.PI / 3, 100, new BABYLON.Vector3(0, 10, 20), scene)  
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-2, -5, 2), scene)
    const light2 = new BABYLON.PointLight('light', new BABYLON.Vector3(2, -5, -2), scene)

    
    const field = new Field(scene)   
    field.click()

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