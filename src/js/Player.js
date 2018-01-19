import * as BABYLON from 'babylonjs'

const url = require('../assets/img/footballPlayer.png')

export default class Player {
  constructor (scene, x, z, height) {    
    this.player = BABYLON.MeshBuilder.CreateSphere('player', { diameterY: height, diameterX: .5, diameterZ: .5 }, scene)
    this.player.position = new BABYLON.Vector3(x, height * .51, z)
    const matPlayer = new BABYLON.StandardMaterial('player', scene)
    matPlayer.diffuseTexture = new BABYLON.Texture(url, scene)
    this.player.material = matPlayer
  }

  got (x, z) { 
    console.log('CLICK') 
    this.player.position.z += .1
    this.player.position.x += .1
  }
}