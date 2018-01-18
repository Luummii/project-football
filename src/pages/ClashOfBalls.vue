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
    const camera = new BABYLON.ArcRotateCamera('Camera', 1, 1.1, 30, new BABYLON.Vector3(7, 0, 0), scene)
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene)

    const matPlan = new BABYLON.StandardMaterial('matPlan', scene)
    matPlan.backFaceCulling = false
    matPlan.emissiveColor = new BABYLON.Color3.FromHexString('#001F9C')

    const plan = BABYLON.MeshBuilder.CreatePlane('plane', { width: 10, height: 10 }, scene)
    plan.material = matPlan
    plan.position = new BABYLON.Vector3(6, 0, 0)
    plan.rotation.x = -Math.PI / 2

    const balloon = BABYLON.MeshBuilder.CreateSphere('balloon', { diameter: .5 }, scene)
    balloon.material = new BABYLON.StandardMaterial("matBallon", scene)
    balloon.position = new BABYLON.Vector3(6, 5, 0)

    let alpha = 0.1
    let move = false
    scene.registerAfterRender(() => {
      if (balloon.intersectsMesh(plan, true)) {        
        move = !move
        balloon.material.emissiveColor = new BABYLON.Color3(1, 0, 0) 
        balloon.position.y += alpha // нужно чтоб вышел из зоны столкновения    
      } else if (move) {
        alpha += 0.001
        balloon.material.emissiveColor = new BABYLON.Color3(1, 1, 1)
        balloon.position.y -= alpha
      } else if (!move) {
        alpha -= 0.001
        balloon.position.y += alpha       
        if (alpha <= 0) move = !move
      }         
    })
    
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