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
      particle: require('../assets/img/particle.png')
    }
  },
  mounted() {  
    const canvas = document.getElementsByClassName('renderCanvas')[0]
    const engine = new BABYLON.Engine(canvas, true) 

    const scene = new BABYLON.Scene(engine)  
    //scene.clearColor = new BABYLON.Color3.Green()

    const camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 20, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene)    
    
    const ground = BABYLON.Mesh.CreatePlane('ground', 50.0, scene)
    ground.position = new BABYLON.Vector3(0, -10, 0)
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
    ground.material = new BABYLON.StandardMaterial('groundMat', scene)
    ground.material.backFaceCulling = false
    ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1)

    const particleSource = BABYLON.Mesh.CreateBox('particleSource', 1.0, scene)
    
    // Создаем систему частиц
    const particleSystem = new BABYLON.ParticleSystem('particles', 2000, scene)

    // Определяем текстуру
    particleSystem.particleTexture = new BABYLON.Texture(this.particle, scene)

    // Определяем источник
    particleSystem.emitter = particleSource

    // Максимальное  и минимальное расстояние выпрыскивания.
    // Грубо говоря, начало и конец луча на протяжении которого происходит появление частиц 
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0)
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0)

    // Внутрений цвет частиц
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0)
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0)
    // Цвет когда частица умирает
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0)

    // Размер, устанавливается рандомно сам
    particleSystem.minSize = 0.1
    particleSystem.maxSize = 0.5

    // Время жизни
    particleSystem.minLifeTime = 0.3
    particleSystem.maxLifeTime = 1.5

    // Сколько частиц будет постояно выделятся, проще говоря - плотность
    particleSystem.emitRate = 1500

    // Разовый выплеск
    // particleSystem.manualEmitCount = 1500

    // Выбор по умолчанию: цвет источника добавляется к цвету назначения без альфа-эффекта
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE
    // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD

    // Гравитация
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0)

    // Направление распространения самой частицы. Устанавливается случайное между двумя
    particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3)
    particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3)

    // Угол поворота частиц
    particleSystem.minAngularSpeed = 0
    particleSystem.maxAngularSpeed = Math.PI

    // Скорость
    particleSystem.minEmitPower = 1
    particleSystem.maxEmitPower = 3
    particleSystem.updateSpeed = 0.005
    
    // Запускаем частицы
    particleSystem.start()

    // Зацыкленный рендеринг сцены
    engine.runRenderLoop(() => {
      particleSource.rotation.x += .01
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