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
      groundTexture: require('../assets/img/grass.jpg'),
      player: require('../assets/img/player.png')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(5, 5, 0), scene) 
    camera.attachControl(canvas, true)

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(10, 5, 20), scene)

    const ground = BABYLON.Mesh.CreatePlane('ground', 50, scene)
    const groundTexture = new BABYLON.Texture(this.groundTexture, scene)
    ground.material = new BABYLON.StandardMaterial('groundMat', scene)
    ground.material.diffuseTexture = groundTexture
    ground.material.diffuseTexture.uScale = 100
    ground.material.diffuseTexture.vScale = 100
    ground.material.diffuseTexture.hasAlpha = true
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)

    const spriteManagerPlayer = new BABYLON.SpriteManager('spriteManagerPlayer', this.player , 1, { width: 108, height: 140 }, scene)
    var player = new BABYLON.Sprite('player', spriteManagerPlayer)
    player.playAnimation(0, 7, true, 100)
    player.position.z = 10
    player.position.y = 1
    player.isPickable = true
    
    scene.onPointerDown = (evt, pickResult) => {                     
      if (pickResult.hit && pickResult.pickedMesh.id === 'ground') {        
        player.position.x = pickResult.pickedPoint.x
        player.position.z = pickResult.pickedPoint.z
      }
    }

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