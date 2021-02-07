<template>
  <div class="threed" ref="threed">
    <div class="three" ref="three">

    </div>
    <div class="switchbutton" @click="switchAction">切换</div>
    <div class="resetbutton" @click="resetAction">重置</div>
  </div>
</template>

<script >
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import fbxfile from "a.fbx"
let camera, scene, renderer, stats,controls;
const clock = new THREE.Clock();

export default {
  name: "mythree",
  props:{
    option:{
      type:Object,
      default:function(){
       return{
         width:1000,
         height:1000,
       }
      }
    }
  },
  data:function () {
    return{
      actions:[],
      mixers:[],
      object:{},
      currentIndex:0,
      fbxs:["Thriller Part 1.fbx","Thriller Part 2.fbx","Thriller Part 3.fbx","Thriller Part 4.fbx"],
      fbxs1:["Thriller Part 1.fbx"]
    }
  },
  methods:{

    switchAction(){
      this.actions.forEach((v,i)=>{
        v.paused  = !v.paused
      })

    },

    resetAction(){
      // camera.position.set( 0, 100, 700 );
      // controls.target.set( 0, 100, 0 );
      // controls.update();
      this.currentIndex+=1

      let loader = new FBXLoader();
      loader.load( this.fbxs[this.currentIndex%this.fbxs.length], object=> {

        let mixer = new THREE.AnimationMixer( object );
        this.mixers = []
        this.mixers.push(mixer)
        let action = mixer.clipAction( object.animations[ 0 ] );
        action.play()
        this.actions= []
        this.actions.push(action)
        object.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

        });
        scene.remove(this.object)
        this.object = object
        scene.add( object );

      } );
    },

    init(v) {
      /*container*/
      const container =this.$refs.three;
      /*camera*/
      camera = new THREE.PerspectiveCamera( 45, this.option.width/ this.option.height, 1, 2000 );
      camera.position.set( 0, 100, 700 );
      /*scene*/
      scene = new THREE.Scene();
      // scene.background = new THREE.Color( 0xa0a0a0 );
      scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

      /*light*/
      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
      hemiLight.position.set( 0, 300, 0 );
      scene.add( hemiLight );

      const dirLight = new THREE.DirectionalLight( 0xffffff );
      dirLight.position.set( 0, 300, 300 );
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 180;
      dirLight.shadow.camera.bottom = - 100;
      dirLight.shadow.camera.left = - 120;
      dirLight.shadow.camera.right = 120;
      scene.add( dirLight );

      //scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

      /*ground*/
      const mesh = new THREE.Mesh( new THREE.PlaneGeometry( this.option.width, this.option.height ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      scene.add( mesh );
      /*grid*/
      const grid = new THREE.GridHelper( this.option.width/8, 8, 0x000000, 0x000000 );
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      scene.add( grid );

      /*model */

      let loader = new FBXLoader();
      loader.load( v, object=> {

        let mixer = new THREE.AnimationMixer( object );
        this.mixers.push(mixer)
        let action = mixer.clipAction( object.animations[ 0 ] );
        action.play()
        this.actions.push(action)
        object.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

        } );

        scene.add( object );
        this.object = object

      } );
     /* renderer*/
      renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true } );
      renderer.setClearAlpha(0)
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize(this.option.width,this.option.height );
      renderer.shadowMap.enabled = true;
      container.appendChild( renderer.domElement );

      controls = new OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 100, 0 );
      controls.update();

      window.addEventListener( 'resize', this.onWindowResize );

      // stats
      stats = new Stats();
   //   container.appendChild( stats.dom );

    },

    onWindowResize() {
      camera.aspect =this.option.width / this.option.height ;
      camera.updateProjectionMatrix();
      renderer.setSize( this.option.width, this.option.height );
    },

    animate() {
      requestAnimationFrame( this.animate );
      const delta = clock.getDelta();
      this.mixers.forEach((v,i)=>{
        v.update(delta)
      })
      renderer.render( scene, camera );
      stats.update();

    },
  },
  mounted() {
    this.init(this.fbxs[this.currentIndex%this.fbxs.length]);
    this.animate();
  }
}
</script>

<style scoped lang="less">
@import "mythree";
</style>
