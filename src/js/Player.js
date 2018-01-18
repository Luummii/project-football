import * as BABYLON from 'babylonjs'

const url = require('../assets/img/grass.jpg')

export default class Player {
  constructor (scene, position) {    
    this.player = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 0, tessellation: 4}, scene)
    this.player.position = position
  }

  click () { 
    console.log('CLICK') 
    this.player.position.z += .01
    this.player.position.x += .01
  }
}