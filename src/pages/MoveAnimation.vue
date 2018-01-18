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
    const camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 3, -30), scene)
    
    const light1 = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0, -1, 0), scene)
    const light2 = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, -1), scene) 
    light1.intensity = 0.25
    light2.intensity = 0.5

    const frameRate = 30

    // ground
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, scene)
    
    // hinge
    const hinge = BABYLON.MeshBuilder.CreateBox('hinge', { width: .1, height: .1, depth: 0.1 }, scene)
    hinge.isVisible = false
    hinge.position.y = 4

    // door
    const door = BABYLON.MeshBuilder.CreateBox('door', { width: 2, height: 4, depth: 0.1 }, scene)
    door.parent = hinge    
    door.position.x = -1
    door.position.y = -2

    // for camera move forward
    const movein = new BABYLON.Animation('movein', 'position', frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    const movein_keys = [] 
    movein_keys.push({
      frame: 0,
      value: new BABYLON.Vector3(0, 5, -30)
    })
    movein_keys.push({
      frame: 3 * frameRate,
      value: new BABYLON.Vector3(0, 2, -10)
    })
    movein_keys.push({
      frame: 5 * frameRate,
      value: new BABYLON.Vector3(0, 2, -10)
    })
    movein_keys.push({
      frame: 8 * frameRate,
      value: new BABYLON.Vector3(-2, 2, 3)
    })
    movein.setKeys(movein_keys)

    const rotate = new BABYLON.Animation('rotate', 'rotation.y', frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
      const rotate_keys = [] 
      rotate_keys.push({
        frame: 0,
        value: 0
      })
      rotate_keys.push({
        frame: 9 * frameRate,
        value: 0
      })
      rotate_keys.push({
        frame: 14 * frameRate,
        value: Math. PI
      })
      rotate.setKeys(rotate_keys)

      const openTheDoor = new BABYLON.Animation('openTheDoor', 'rotation.y', frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
      const sweep_keys = [] 
      sweep_keys.push({
          frame: 0,
          value: 0
      })
      sweep_keys.push({
          frame: 3 * frameRate,
          value: 0
      })
      sweep_keys.push({
          frame: 5 * frameRate,
          value: Math.PI/3
      })
      sweep_keys.push({
          frame: 13 * frameRate,
          value: Math.PI/3
      })
      sweep_keys.push({
          frame: 15 * frameRate,
          value: 0
      })
      openTheDoor.setKeys(sweep_keys)

    scene.beginDirectAnimation(camera, [movein, rotate], 0, 25 * frameRate, false)    
    scene.beginDirectAnimation(hinge, [openTheDoor], 0, 25 * frameRate, false) 

    /************** Building of house on the scene ***************/
    const wall1 = BABYLON.MeshBuilder.CreateBox('door', { width: 8, height: 6, depth: 0.1 }, scene)
    wall1.position.x = -6
    wall1.position.y = 3

    const wall2 = BABYLON.MeshBuilder.CreateBox('door', { width: 4, height: 6, depth: 0.1 }, scene)
    wall2.position.x = 2
    wall2.position.y = 3

    const wall3 = BABYLON.MeshBuilder.CreateBox('door', { width: 2, height: 2, depth: 0.1 }, scene)
    wall3.position.x = -1
    wall3.position.y = 5

    const wall4 = BABYLON.MeshBuilder.CreateBox('door', { width: 14, height: 6, depth: 0.1 }, scene)
    wall4.position.x = -3
    wall4.position.y = 3
    wall4.position.z = 7

    const wall5 = BABYLON.MeshBuilder.CreateBox('door', { width: 7, height: 6, depth: 0.1 }, scene)
    wall5.rotation.y = Math.PI/2
    wall5.position.x = -10
    wall5.position.y = 3
    wall5.position.z = 3.5

    const wall6 = BABYLON.MeshBuilder.CreateBox('door', { width: 7, height: 6, depth: 0.1 }, scene)
    wall6.rotation.y = Math.PI/2
    wall6.position.x = 4
    wall6.position.y = 3
    wall6.position.z = 3.5

    const roof = BABYLON.MeshBuilder.CreateBox('door', { width: 14, height: 7, depth: 0.1 }, scene)
    roof.rotation.x = Math.PI/2
    roof.position.x = -3
    roof.position.y = 6
    roof.position.z = 3.5

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