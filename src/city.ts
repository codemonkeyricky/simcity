
export function createCity(size: number) {
    const data: any[][] = [];

    initialize();

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile: {x: number; y: number; building?: string} = {
                    x,
                    y,
                    building: undefined,
                    update() { console.log('Updating tile at', this.x, this.y); }
                };

                if (Math.random() > 0.7) {
                    tile.building = 'building';
                }

                column.push(tile);
            }
            data.push(column);
        }
    }

    function update() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                data[x][y].update();
            }
        }
    }

    return { size, data, update }
}