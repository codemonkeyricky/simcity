
import * as THREE from 'three';
import { createCamera } from './camera';

export function createScene() {

    const gameWindow = document.getElementById('render-target');
    if (!gameWindow) {
        throw new Error('render-target element not found in DOM');
    }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    console.log('Renderer size set to:', gameWindow.offsetWidth, 'x', gameWindow.offsetHeight);

    let meshes = [];
    function initialize(city) {
        scene.clear();
        meshes = [];
        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                // load tile
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, 0, y);
                scene.add(mesh);

                // add mesh to scene
                scene.add(mesh)

                // add mesh to meshes  array
                column.push(mesh);
            }
            meshes.push(column);
        }
    }

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    function onMouseDown(event: MouseEvent) {
        camera.onMouseDown(event);
    }

    function onMouseUp(event: MouseEvent) {
        camera.onMouseUp(event);
    }

    function onMouseMove(event: MouseEvent) {
        camera.onMouseMove(event);
    }

    return {
        initialize,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}