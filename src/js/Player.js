import * as BABYLON from 'babylonjs'

const url = require('../assets/img/grass.jpg')

export default class Player {
  constructor (scene) {    
    const field = new BABYLON.Mesh.CreatePlane('field', 500, scene)
    const fieldTexture = new BABYLON.Texture(url, scene)
    field.material = new BABYLON.StandardMaterial('fieldMat', scene)
    field.material.diffuseTexture = fieldTexture
    field.material.diffuseTexture.uScale = 100
    field.material.diffuseTexture.vScale = 100
    field.material.diffuseTexture.hasAlpha = true
    field.position = new BABYLON.Vector3(0, -3, 0)
    field.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
  }

  click() { console.log('CLICK') }
}