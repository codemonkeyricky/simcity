
export function createCity(size: number) {
    const data: any[][] = [];

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile: { x: number; y: number; building?: string } = { x, y, building: undefined };

                if (Math.random() > 0.7) {
                    tile.building = 'building';
                }

                column.push(tile);
            }
            data.push(column);
        }
    }

    initialize();

    return {
        size,
        data
    }
}