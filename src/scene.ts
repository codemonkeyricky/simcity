
import * as THREE from 'three';

import {createAssetInstance} from './assets';
import {createCamera} from './camera';

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

    let terrain: any[] = [];
    let buildings = [];

    function initialize(city: {size: number; data: any[][]}) {
        scene.clear();
        terrain = [];
        buildings = [];
        for (let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                const mesh = createAssetInstance('grass', x, y);
                scene.add(mesh);
                column.push(mesh);
            }
            terrain.push(column);
            buildings.push([...Array(city.size)]);
        }
        setupLights();
    }

    function update(city) {
        for (let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const currentBuildingId = buildings[x][y]?.userData.id;
                const newBuildingId = city.data[x][y].buildingId;

                if (!newBuildingId && currentBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = undefined;
                }

                if (newBuildingId !== currentBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = createAssetInstance(newBuildingId, x, y);
                    scene.add(buildings[x][y]);
                }
            }
        }
    }

    function setupLights() {
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2), new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3), new THREE.DirectionalLight(0xffffff, 0.3)
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
    }

    function draw() { renderer.render(scene, camera.camera); }

    function start() { renderer.setAnimationLoop(draw); }

    function stop() { renderer.setAnimationLoop(null); }

    function onMouseDown(event: MouseEvent) { camera.onMouseDown(event); }

    function onMouseUp(event: MouseEvent) { camera.onMouseUp(event); }

    function onMouseMove(event: MouseEvent) { camera.onMouseMove(event); }

    return { initialize, update, start, stop, onMouseDown, onMouseUp, onMouseMove }
}