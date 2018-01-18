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
      textureBox: require('../assets/img/textureBox.jpg')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, -8, -20), scene)   
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(-2, -5, 2), scene)
    const light2 = new BABYLON.PointLight('Omni', new BABYLON.Vector3(2, -5, -2), scene)

    const ground = BABYLON.Mesh.CreatePlane('ground', 50.0, scene)
    ground.material = new BABYLON.StandardMaterial('groundMat', scene)
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1)
    ground.material.backFaceCulling = true // Можно видеть сквозь объект, если порименить это к box
    ground.position = new BABYLON.Vector3(5, -10, -15)
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)

    const box = BABYLON.Mesh.CreateBox('box', 2, scene)
    box.material = new BABYLON.StandardMaterial('boxMat', scene)
    box.material.diffuseTexture = new BABYLON.Texture(this.textureBox, scene)
    box.material.diffuseTexture.hasAlpha = true // Через прозрачные области куба можно видеть задние поверхности
    box.position = new BABYLON.Vector3(5, -9, -10)    
    
    scene.gravity = new BABYLON.Vector3(0, -0.009, 0) // Определяем гравитацию
    camera.applyGravity = true // Применяем её к камере
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1) // Определяем размер чувака, который ходит
    scene.collisionsEnabled = true  // Говорим что на сцене нужно обноруживать коллизии
    
    // То, что будет участвовать в столкновениях
    camera.checkCollisions = true
    ground.checkCollisions = true
    box.checkCollisions = true

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