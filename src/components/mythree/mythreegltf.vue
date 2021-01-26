<template>
  <div class="threed" ref="threed">
  </div>
</template>

<script >
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer;



export default {
  name: "mythreegltf",
  data:function () {
    return{
    }
  },
  methods:{
    init() {

      const container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
      camera.position.set( - 1.8, 0.6, 2.7 );

      scene = new THREE.Scene();

      new RGBELoader()
          .setDataType( THREE.UnsignedByteType )
          .setPath( '/static' )
          .load( 'royal_esplanade_1k.hdr', function ( texture ) {

            const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

            scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            this.render();

            // model

            // use of RoughnessMipmapper is optional
            const roughnessMipmapper = new RoughnessMipmapper( renderer );

            const loader = new GLTFLoader().setPath( '/static' );
            loader.load( 'DamagedHelmet.gltf', function ( gltf ) {

              gltf.scene.traverse( function ( child ) {

                if ( child.isMesh ) {

                  // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                  // roughnessMipmapper.generateMipmaps( child.material );

                }

              } );

              scene.add( gltf.scene );

              roughnessMipmapper.dispose();

              this.render();

            } );

          } );

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild( renderer.domElement );

      const pmremGenerator = new THREE.PMREMGenerator( renderer );
      pmremGenerator.compileEquirectangularShader();

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.addEventListener( 'change', this.render ); // use if there is no animation loop
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.target.set( 0, 0, - 0.2 );
      controls.update();

      window.addEventListener( 'resize', this.onWindowResize );

    },

    onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
      this.render();
    },

//

    render() {
      renderer.render( scene, camera );
    },
  },
  mounted() {
    this.init();
    this.render();
  }
}
</script>

<style scoped lang="less">
@import "mythree";
</style>
