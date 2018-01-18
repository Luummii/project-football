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
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, 0), scene)   
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
    ground.position = new BABYLON.Vector3(0, 0, 0) // -4 т.к. высота стены 8
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)

    const height = 10
    const box1 = BABYLON.MeshBuilder.CreateBox('box1', { width: 10, height: height, depth: 5 }, scene)
    box1.position = new BABYLON.Vector3(50, 5, 100)

    const matBox2 = new BABYLON.StandardMaterial('matBox2', scene);
    matBox2.diffuseColor = new BABYLON.Color3.FromHexString('#FF0000')
    const box2 = BABYLON.MeshBuilder.CreateBox('box2', { width: 10, height: height, depth: 5 }, scene)
    box2.position = new BABYLON.Vector3(-50, 5, -100)
    box2.material = matBox2    

    const matBox3 = new BABYLON.StandardMaterial('matBox3', scene);
    matBox3.diffuseColor = new BABYLON.Color3.FromHexString('#1D00FF')
    const box3 = BABYLON.MeshBuilder.CreateBox('box3', { width: 10, height: height, depth: 5 }, scene)
    box3.position = new BABYLON.Vector3(20, 5, -100)
    box3.material = matBox3

    scene.gravity = new BABYLON.Vector3(0, -0.9, 0)
    camera.applyGravity = true    
    
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
    scene.collisionsEnabled = true

    camera.checkCollisions = true
    camera.isPickable = false
    ground.checkCollisions = true
    box1.checkCollisions = true
    box2.checkCollisions = true

    scene.onPointerDown = (evt, pickResult) => {                      
      if (pickResult.hit && pickResult.pickedMesh.id === 'box1') {        
        box1.scaling.y += .01 // Увеличиваем рзмера.1 
        box1.position.y += .05 // Соответственно увеличиваем и смещение позициина .1 а это начальное 5 * .1
      }
    } 

    scene.onPointerMove = () => {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY)
      if (pickResult.hit) {
		    const diffX = pickResult.pickedPoint.x - box2.position.x
		    const diffY = pickResult.pickedPoint.z - box2.position.z
		    box2.rotation.y = Math.atan2(diffX, diffY)		          
    	}
    }

    const vecToLocal = (vector, mesh) => { 
      const m = mesh.getWorldMatrix()
      return BABYLON.Vector3.TransformCoordinates(vector, m)      
    }

    scene.registerBeforeRender(() => {      
      const origin = camera.position	

      // Вычисляем направление относительно начала координат экрана в пространстве
	    let forward = new BABYLON.Vector3(0, 0, 1)
      forward = vecToLocal(forward, camera)	
	    let direction = forward.subtract(origin)
	    direction = BABYLON.Vector3.Normalize(direction)

      // Длина луча
	    const length = 100	

      // Создаем луч
	    const ray = new BABYLON.Ray(origin, direction, length)
      const hit = scene.pickWithRay(ray) // 1 вариант

      // 2 вариант
/*       const hit = scene.pickWithRay(ray, (item) => {
        console.log(item)
      }) */
      
      if (hit.pickedMesh){
        console.log(hit.pickedMesh.id)
		    if (hit.pickedMesh.id === 'box1' || hit.pickedMesh.id === 'box2' || hit.pickedMesh.id === 'box3') hit.pickedMesh.scaling.y += 0.01
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