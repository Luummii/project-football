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
      groundTexture: [require('../assets/img/textureMountain.jpg'), require('../assets/img/textureMountain.jpg')]
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine) 

    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 30, 10), scene)
    light.diffuse = new BABYLON.Color3(1, 1, 1)
    light.specular = new BABYLON.Color3(0, 0, 0)

    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0.8, 10, BABYLON.Vector3.Zero(), scene)
    camera.lowerBetaLimit = 0.1
    camera.upperBetaLimit = (Math.PI / 2) * 0.9
    camera.lowerRadiusLimit = 30
    camera.upperRadiusLimit = 150
    camera.attachControl(canvas, true)

    const groundMaterial = new BABYLON.StandardMaterial('ground', scene)
    groundMaterial.diffuseTexture = new BABYLON.Texture(this.groundTexture[0], scene)

    const ground = BABYLON.Mesh.CreateGroundFromHeightMap('ground', this.groundTexture[1], 200, 200, 250, 0, 10, scene, false)
    ground.material = groundMaterial

    // Skybox
    const stars = BABYLON.MeshBuilder.CreateBox('stars', { size: 5000, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene)
    const starMat = new BABYLON.StandardMaterial('stars', scene)
    const urlStar = 'http://jerome.bousquie.fr/BJS/images/stars1.jpg'
    const texStar = new BABYLON.Texture(urlStar, scene)
    texStar.uScale = 3
    texStar.vScale = 3
    starMat.diffuseTexture = texStar
    stars.material = starMat
    
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