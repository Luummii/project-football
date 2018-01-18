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
    const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 8, BABYLON.Vector3.Zero(), scene)
    camera.setPosition(new BABYLON.Vector3(5, 5, -5))
    camera.attachControl(canvas, false)

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)

    const points = []

    const deltaTheta = 1
    const deltaY = 0.005
    const radius = 1

    let theta = 0
    let Y = 0

    for (let i = 0; i < 1400; i++) {
        points.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)))
        theta += deltaTheta
        Y += deltaY
    }

    const lines = BABYLON.MeshBuilder.CreateLines('lines', { points: points }, scene)    

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