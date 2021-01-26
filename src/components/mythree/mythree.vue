<template>
  <div class="threed" ref="threed">
  </div>
</template>

<script >
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import fbxfile from "a.fbx"
let camera, scene, renderer, stats;

const clock = new THREE.Clock();

let mixer;



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

    }
  },
  methods:{
    init() {

      const container =this.$refs.threed;

      camera = new THREE.PerspectiveCamera( 45, this.option.width/ this.option.height, 1, 2000 );
      camera.position.set( 100, 200, 300 );

      scene = new THREE.Scene();
      //scene.background = new THREE.Color( 0xa0a0a0 );
      scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

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

      // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

      // ground
      const mesh = new THREE.Mesh( new THREE.PlaneGeometry( this.option.width, this.option.height ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
      mesh.rotation.x = - Math.PI / 2;
      mesh.receiveShadow = true;
      scene.add( mesh );

      const grid = new THREE.GridHelper( this.option.width/4, 2, 0x000000, 0x000000 );
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
     // scene.add( grid );

      // model
      const loader = new FBXLoader();
      loader.load( "Thriller Part 4.fbx", function ( object ) {

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[ 0 ] );
        action.play();

        object.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

        } );

        scene.add( object );

      } );

      renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true } );
      renderer.setClearAlpha(0)
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize(this.option.width,this.option.height );
      renderer.shadowMap.enabled = true;
      container.appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );
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

//

    animate() {
      requestAnimationFrame( this.animate );
      const delta = clock.getDelta();
      if ( mixer ) mixer.update( delta );
      renderer.render( scene, camera );
      stats.update();

    },
  },
  mounted() {

    this.init();
    this.animate();
  }
}
</script>

<style scoped lang="less">
@import "mythree";
</style>
