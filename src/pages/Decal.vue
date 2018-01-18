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
      impactMat: require('../assets/img/impact.png')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine) 
    scene.clearColor = new BABYLON.Color3.Red()

    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 30, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)
    const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene)    
    const box = BABYLON.MeshBuilder.CreateBox('box', { height: 10, width: 10, depth: 5 }, scene) 

    const material = new BABYLON.StandardMaterial('mat', scene)
    material.diffuseColor = BABYLON.Color3.Green()
    box.material = material

    const impactMat = new BABYLON.StandardMaterial('impactMat', scene)
    impactMat.diffuseTexture = new BABYLON.Texture(this.impactMat, scene)
    impactMat.diffuseTexture.hasAlpha = true 

    scene.onPointerDown = (evt, pickResult) => {         
      if (pickResult.hit) {
          const decal = BABYLON.MeshBuilder.CreateDecal('decal', box, { position: pickResult.pickedPoint, normal: pickResult.getNormal(true) })
          decal.material = impactMat
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