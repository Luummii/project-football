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
      wallTexture: require('../assets/img/wallTexture.jpg'),
      groundTexture: require('../assets/img/grass.jpg'),
      ballTexture: require('../assets/img/ballTexture.png')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)      
    // const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 3, Math.PI / 3, 400, new BABYLON.Vector3(0, 10, 20), scene)
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)   
    camera.attachControl(canvas, true)

    const light1 = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-2, -5, 2), scene)
    const light2 = new BABYLON.PointLight('light', new BABYLON.Vector3(2, -5, -2), scene)

    const ground = BABYLON.Mesh.CreatePlane('ground', 500, scene)
    const groundTexture = new BABYLON.Texture(this.groundTexture, scene)
    ground.material = new BABYLON.StandardMaterial('groundMat', scene)
    ground.material.diffuseTexture = groundTexture
    ground.material.diffuseTexture.uScale = 100
    ground.material.diffuseTexture.vScale = 100
    ground.material.diffuseTexture.hasAlpha = true
    ground.position = new BABYLON.Vector3(0, -3, 0) // -4 т.к. высота стены 8
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)

    const wallMaterial = new BABYLON.StandardMaterial('boxMat', scene)
    const wallTexture = new BABYLON.Texture(this.wallTexture, scene)
    const wall = []
    wall[0] = BABYLON.MeshBuilder.CreateBox('wall', { width: 500, height: 10, depth: 2 }, scene)
    wall[0].material = wallMaterial
    wall[0].material.diffuseTexture = wallTexture
    wall[0].material.diffuseTexture.uScale = 100
    wall[0].material.diffuseTexture.hasAlpha = true
    wall[0].position.x = 250
    wall[0].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0)

    wall[1] = wall[0].clone()
    wall[1].position.z = -250
    wall[1].position.x = 0
    wall[1].rotation = new BABYLON.Vector3(0, 0, -Math.PI)

    wall[2] = wall[0].clone()
    wall[2].position.x = -250
    wall[2].rotation = new BABYLON.Vector3(0, Math.PI / 2, -Math.PI)

    wall[3] = wall[0].clone()
    wall[3].position.z = 250
    wall[3].position.x = 0
    wall[3].rotation = new BABYLON.Vector3(0, 0, 0)

    const ball = BABYLON.MeshBuilder.CreateSphere('ball', { diameter: 5 }, scene)
    ball.material = new BABYLON.StandardMaterial('ballMat', scene)    
    ball.material.diffuseTexture = new BABYLON.Texture(this.ballTexture, scene)
    ball.material.diffuseTexture.hasAlpha = true
    ball.position = new BABYLON.Vector3(50, 0, 0)

    scene.gravity = new BABYLON.Vector3(0, -0.9, 0)
    camera.applyGravity = true    
    
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
    scene.collisionsEnabled = true

    camera.checkCollisions = true
    ground.checkCollisions = true
    ball.checkCollisions = true
    wall[0].checkCollisions = true
    wall[1].checkCollisions = true
    wall[2].checkCollisions = true
    wall[3].checkCollisions = true

    const frameVal = 30
    const animationX = new BABYLON.Animation('animation', 'position.x', frameVal, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    const animationY = new BABYLON.Animation('animation', 'position.y', frameVal, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    const animationZ = new BABYLON.Animation('animation', 'position.z', frameVal, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)

    const keysX = []
    const keysY = []
    const keysZ = []
    
    keysX.push({
      frame: 0,
      value: 0
    })
    keysX.push({
      frame: 2 * frameVal,
      value: 10
    })
    keysX.push({
      frame: 4 * frameVal,
      value: 20
    })
    keysX.push({
      frame: 40 * frameVal,
      value: 200
    })

    keysY.push({
      frame: 2 * frameVal,
      value: 10
    })
    keysY.push({
      frame: 7 * frameVal,
      value: 100
    })

    keysZ.push({
      frame: 2 * frameVal,
      value: 0
    })
    keysZ.push({
      frame: 20 * frameVal,
      value: 300
    })

    animationX.setKeys(keysX)
    animationY.setKeys(keysY)
    animationZ.setKeys(keysZ)

    ball.animations = []
    ball.animations.push(animationX)
    ball.animations.push(animationY)
    ball.animations.push(animationZ)


    scene.beginAnimation(ball, 0, 100000, false)

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