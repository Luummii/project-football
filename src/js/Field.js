import * as BABYLON from 'babylonjs'

const url = require('../assets/img/grass.jpg')

export default class Field {
  constructor (scene) {    
    const field = new BABYLON.MeshBuilder.CreatePlane('field', { width: 112, height: 77 }, scene)
    const fieldTexture = new BABYLON.Texture(url, scene)
    field.material = new BABYLON.StandardMaterial('fieldMat', scene)
    field.material.diffuseTexture = fieldTexture
    field.material.diffuseTexture.uScale = 100
    field.material.diffuseTexture.vScale = 100
    field.material.diffuseTexture.hasAlpha = true
    field.position = new BABYLON.Vector3(0, 0, 0)
    field.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)

    const c_line = new BABYLON.MeshBuilder.CreatePlane('field', { width: .25, height: 75 }, scene)
    c_line.position = new BABYLON.Vector3(0, .02, 0)
    c_line.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0)
    
    const top_line = new BABYLON.MeshBuilder.CreatePlane('field', { width: .25, height: 110 }, scene)
    top_line.position = new BABYLON.Vector3(0, .02, 37.5)
    top_line.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI / 2, 0)

    const bottom_line = top_line.clone()
    bottom_line.position = new BABYLON.Vector3(0, .02, -37.5)

    const left_line = c_line.clone()
    left_line.position = new BABYLON.Vector3(-55, .02, 0)

    const right_line = c_line.clone()
    right_line.position = new BABYLON.Vector3(55, .02, 0)

    const hoopCentral = new BABYLON.MeshBuilder.CreateTorus('field', { thickness: 0.1, diameter: 18.3, tessellation: 100 }, scene)
    hoopCentral.scaling = new BABYLON.Vector3 (1, 0.001, 1)
    hoopCentral.position = new BABYLON.Vector3(0, .05, 0)

    const pointCentral = new BABYLON.MeshBuilder.CreateTorus('field', { thickness: .5, diameter: .1, tessellation: 100 }, scene)
    pointCentral.scaling = new BABYLON.Vector3 (1, 0.001, 1)
    pointCentral.position = new BABYLON.Vector3(0, .05, 0)
  }

  click() { console.log('CLICK') }
}