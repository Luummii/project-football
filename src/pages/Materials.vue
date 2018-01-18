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
    camera.attachControl(canvas, true) 

    // Light
    const light = new BABYLON.SpotLight('light', new BABYLON.Vector3(1, 1 , 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene)	  
    // There are several lighting options see here - https://www.eternalcoding.com/?p=303
    light.diffuse = new BABYLON.Color3.FromHexString('#FF0020') // r g b
    
    // Sphere material
    const matSphere = new BABYLON.StandardMaterial('matSphere', scene)
  	matSphere.emissiveColor = new BABYLON.Color3.FromHexString('#00FF06') // another set color

    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 0.25 }, scene)
    sphere.material = matSphere
    sphere.position.x  =  1
    sphere.position.z  =  1
    sphere.position.y  =  1

    const groundMat = new BABYLON.StandardMaterial('groundMat', scene)
    groundMat.diffuseColor = new BABYLON.Color3.FromHexString('#39D1C4')
    groundMat.maxSimultaneousLights = 16
    
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 4, height: 6 }, scene)	
    ground.material = groundMat

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