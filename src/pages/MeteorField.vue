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

    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0.8, 10, BABYLON.Vector3.Zero(), scene)
    camera.setPosition(new BABYLON.Vector3(0, 50, -100))
    camera.attachControl(canvas, true)

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), scene)
    light.intensity = 0.75
    light.specular = new BABYLON.Color3(0, 0, 0)

    const pointLight = new BABYLON.PointLight('pl', new BABYLON.Vector3(0, 0, 0), scene)
    pointLight.diffuse = new BABYLON.Color3(1, 1, 1)
    pointLight.specular = new BABYLON.Color3(0.1, 0.1, 0.12)
    pointLight.intensity = 0.75
    
    const meteorMaterialUrl = "http://jerome.bousquie.fr/BJS/images/rock.jpg"
    const meteorMaterial = new BABYLON.StandardMaterial('meteor', scene)
    meteorMaterial.diffuseTexture = new BABYLON.Texture(meteorMaterialUrl, scene)
    meteorMaterial.backFaceCulling = false

    // Skybox
    const stars = BABYLON.MeshBuilder.CreateBox('stars', { size: 5000, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene)
    const starMat = new BABYLON.StandardMaterial('stars', scene)
    const urlStar = 'http://jerome.bousquie.fr/BJS/images/stars1.jpg'
    const texStar = new BABYLON.Texture(urlStar, scene)
    texStar.uScale = 3
    texStar.vScale = 3
    starMat.diffuseTexture = texStar
    stars.material = starMat

    const fact = 600 // разброс

    // Создание вершин
    const vertex = (particle, vertex, i) => {
      vertex.x *= (Math.random() + 1)
      vertex.y *= (Math.random() + 1)
      vertex.z *= (Math.random() + 1)
    }

    const position = (particle, i, s) => {  
      // i - глобальный индекс частицы    
      // s - индексч на конкретной сетке SPS.addShape() может быть много  
      const scaleX = Math.random() * 2 + 0.8
      const scaleY = Math.random() + 0.8
      const scaleZ = Math.random() * 2 + 0.8
      particle.scale.x = scaleX
      particle.scale.y = scaleY
      particle.scale.z = scaleZ
      particle.position.x = (Math.random() - 0.5) * fact
      particle.position.y = (Math.random() - 0.5) * fact
      particle.position.z = (Math.random() - 0.5) * fact
      particle.rotation.x = Math.random() * 3.5
      particle.rotation.y = Math.random() * 3.5
      particle.rotation.z = Math.random() * 3.5
    }

    const SPS = new BABYLON.SolidParticleSystem('SPS', scene)

    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 6, segments: 8 }, scene)
    SPS.addShape(sphere, 1000, { positionFunction: position, vertexFunction: vertex })
    
    const mesh = SPS.buildMesh()
    mesh.material = meteorMaterial
    sphere.dispose()

    // SPS animation
    let k = Date.now()
    scene.registerBeforeRender(function() {
      pointLight.position = camera.position
      SPS.mesh.rotation.y += 0.001
      SPS.mesh.position.y = Math.sin((k - Date.now())/1000) * 2
      k += 0.02
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