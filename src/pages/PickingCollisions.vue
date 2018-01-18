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
      impact: require('../assets/img/impact.png')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, -30, BABYLON.Vector3.Zero(), scene)

    const wall = BABYLON.Mesh.CreatePlane('wall', 20, scene)
    wall.material = new BABYLON.StandardMaterial('wallMat', scene)
    wall.material.emissiveColor = new BABYLON.Color3(0.5, 1, 0.5)

    const impact = BABYLON.Mesh.CreatePlane('impact', 1, scene)
    impact.material = new BABYLON.StandardMaterial('impactMat', scene)
    impact.material.diffuseTexture = new BABYLON.Texture(this.impact, scene)
    impact.material.diffuseTexture.hasAlpha = true    

    scene.onPointerDown = (evt, pickResult) => {    //  pickResult - объекть по которому кликнули. Если много объектов в области клика то можем получить массив 
      if (pickResult.hit) {
          impact.position.x = pickResult.pickedPoint.x
          impact.position.y = pickResult.pickedPoint.y
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