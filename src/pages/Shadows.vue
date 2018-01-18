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
      groundTexture: [require('../assets/img/ground.jpg'), require('../assets/img/ground.jpg')]
    }
  },
  mounted() {
    const canvas = document.getElementsByClassName('renderCanvas')[0]    
    const engine = new BABYLON.Engine(canvas, true) 
    const scene = new BABYLON.Scene(engine) 

    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -2, -1), scene)
	  light.position = new BABYLON.Vector3(-10, 40, 20)

    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0.8, 10, BABYLON.Vector3.Zero(), scene)
    camera.lowerBetaLimit = 0.1
    camera.upperBetaLimit = (Math.PI / 2) * 0.9
    camera.lowerRadiusLimit = 30
    camera.upperRadiusLimit = 150
    camera.attachControl(canvas, true)

    const groundMaterial = new BABYLON.StandardMaterial('ground', scene)
    groundMaterial.diffuseTexture = new BABYLON.Texture(this.groundTexture[0], scene)

    const ground = BABYLON.Mesh.CreateGroundFromHeightMap('ground', this.groundTexture[1], 100, 100, 100, 0, 10, scene, false)
    ground.material = groundMaterial

    const torus = BABYLON.Mesh.CreateTorus('torus', 4, 2, 30, scene, false)

    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
    // Закидываем объект на котором будем строить тень
    shadowGenerator.getShadowMap().renderList.push(torus)
    // Сила тени когда объект приближается или отдаляется от неё
    shadowGenerator.frustumEdgeFalloff = 1.0
    // Делаем размытие
    shadowGenerator.useBlurExponentialShadowMap = true
    // Не пересчитывать тень светом
    light.autoUpdateExtends = false
    // Устанавливаем, где будут отображатся тени
    ground.receiveShadows = true

    let alpha = 0
    scene.registerBeforeRender(() => {
      torus.rotation.x += 0.01
      torus.rotation.z += 0.02
      torus.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 10, Math.sin(alpha) * 30)
      alpha += 0.01
    })

    // дебаг панель
    scene.debugLayer.show()
    
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