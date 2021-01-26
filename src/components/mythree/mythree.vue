<template>
<div class="threed" ref="threed">
<!--  <img  :src="path"/>-->
</div>
</template>

<script type="module">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
export default {
  name: "mythree",
  data:function () {
    return{
      // path:require("/static/right.svg")
    }
  },
  methods:{

  },
  mounted() {

    const clock = new THREE.Clock();

    //scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

    //camera
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2000)
    camera.position.set( 100, 200, 300 );


    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 200, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 200, 100 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    scene.add( dirLight );


    // ground
    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );

    // model
    const loader = new FBXLoader();
    let mixer;
    loader.load( "/static/a.fbx", function ( object ) {
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




    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    this.$refs.threed.appendChild(renderer.domElement)

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 100, 0 );
    controls.update();

  // stats
    let stats = new Stats();
  //  this.$refs.threed.appendChild( stats.dom );

    function animate(){
      requestAnimationFrame(animate)
      const delta = clock.getDelta();
      if ( mixer ) mixer.update( delta );
      renderer.render( scene, camera );
      stats.update();
    }
    animate()
  }
}
</script>

<style scoped lang="less">
@import "mythree";
</style>
