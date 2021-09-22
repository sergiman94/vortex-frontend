/*eslint-disable*/

import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
class ThreejsExampleModule extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();

        let parentWidth = document.getElementById("graph-id")
        // renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( parentWidth.clientWidth - 40, 800 );
        this.mount.appendChild( renderer.domElement );
      
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshStandardMaterial( { color: 0x7e31eb } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );
        camera.position.z = 2;
        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            renderer.render( scene, camera );
        };
        animate();
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}
// const rootElement = document.getElementById("graph-id")
// ReactDOM.render(<ThreejsModule/>, rootElement);
export default ThreejsExampleModule;