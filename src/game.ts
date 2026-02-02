

import {createCity} from './city.ts';
import {createScene} from './scene.ts';

export function createGame() {
    let activeToolId = 'bulldoze';

    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject: any) => {
        let {x, y} = selectedObject.userData;
        const tile = city.data[x][y];

        if (activeToolId === 'bulldoze') {
            tile.buildingId = undefined;
            scene.update(city)
        } else if (!tile.buildingId && activeToolId) {
            tile.buildingId = activeToolId;
            scene.update(city)
        }
    };

    document.addEventListener('mousedown', scene.onMouseDown.bind(scene), false);
    document.addEventListener('mouseup', scene.onMouseUp.bind(scene), false);
    document.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);
    document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId: string) {
            activeToolId = toolId;
            console.log(activeToolId);
        }
    }

    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();

    return game;
}