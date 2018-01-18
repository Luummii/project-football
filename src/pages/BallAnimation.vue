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
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 4, Math.PI / 4, 12, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    
    const light = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(0, 300, -10), new BABYLON.Vector3(0, -10, 0), Math.PI / 4, 500, scene)
    
    const material = new BABYLON.StandardMaterial('material', scene)
  	material.emissiveColor = new BABYLON.Color3.FromHexString('#4A52BB')
    
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: .5 }, scene)
    sphere.material = material
    sphere.position.x = 0

    const animation = new BABYLON.Animation('animation', 'position.z', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

    const keys = []
    keys.push({
      frame: 0,
      value: 0
    })

    keys.push({
      frame: 3 * 30,
      value: 5
    })

    keys.push({
      frame: 5 * 30,
      value: -5
    })

    keys.push({
      frame: 9 * 30,
      value: 6
    })

    keys.push({
      frame: 11 * 30,
      value: -6
    })

    animation.setKeys(keys)

    sphere.animations = []
    sphere.animations.push(animation)

    scene.beginAnimation(sphere, 0, 330, true)

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