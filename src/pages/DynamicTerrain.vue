<template>
  <div class="container">
    <canvas class="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export default {
  data () {
    return {
      textureBox: require('../assets/img/textureBox.jpg')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(-2, -5, 2), scene)
    const light2 = new BABYLON.PointLight('Omni', new BABYLON.Vector3(2, -5, -2), scene)

    const ground = BABYLON.Mesh.CreatePlane('ground', 50.0, scene)
    ground.material = new BABYLON.StandardMaterial('groundMat', scene)
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
    ground.material.backFaceCulling = true
    ground.position = new BABYLON.Vector3(5, -10, -15)
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
    
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