<template>
<div class="threed" ref="threed">

</div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: "3d",
  data:function () {

  },
  methods:{

  },
  mounted() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    this.$refs.threed.appendChild(renderer.domElement)
    camera.position.set(0,0,100)

    //立方体
    const geometry = new THREE.BoxGeometry(10,10,10)
    const meterial = new THREE.MeshBasicMaterial({color:0xffff00})
    const cube = new THREE.Mesh(geometry,meterial)
    //scene.add(cube)

    //直线
    const linegeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-10,0,0),
      new THREE.Vector3(0,10,0),
      new THREE.Vector3(10,0,0),
    ])
    const linemetrial = new THREE.LineBasicMaterial({color:0x0000ff})
    const line = new THREE.Line(linegeometry,linemetrial)
    //scene.add(line)


    const fontloader = new THREE.FontLoader()
    fontloader.load("a.json",function (font) {
      const fontmat = new THREE.LineBasicMaterial({color:0x006688,side:THREE.DoubleSide})
      const fontshapes = font.generateShapes("summer",100)
      const fontgeo = new THREE.ShapeBufferGeometry(fontshapes)
      fontgeo.computeBoundingBox()
      const xMid = - 0.5 * ( fontgeo.boundingBox.max.x - fontgeo.boundingBox.min.x );
      fontgeo.translate( xMid, 0, 0 )
      const text = new THREE.Mesh(fontgeo,fontmat)
      text.position.set(0,0,-150)
      scene.add(text)


      const holeshapes = []
      for(let i=0;i<fontshapes.length;i++){
        const shape = fontshapes[i]
        if ( shape.holes && shape.holes.length > 0 ) {
          for ( let j = 0; j < shape.holes.length; j ++ ) {
            const hole = shape.holes[ j ];
            holeshapes.push( hole );
          }
        }
      }
      fontshapes.push.apply( fontshapes, holeshapes );

      const lineText = new THREE.Object3D();

      for ( let i = 0; i < fontshapes.length; i ++ ) {

        const shape = fontshapes[ i ];

        const points = shape.getPoints();
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        geometry.translate( xMid, 0, 0 );

        const lineMesh = new THREE.Line( geometry, fontmat );
        lineText.add( lineMesh );

      }

      scene.add( lineText );
    })


    // const textgeo = new THREE.TextGeometry("summer",{
    //   font:
    // })




    function animate(){
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene,camera)
    }
    animate()
  }
}
</script>

<style scoped lang="less">
@import "3d";
</style>
