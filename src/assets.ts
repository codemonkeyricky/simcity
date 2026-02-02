
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
    'grass': (x, y) => {
        // grass
        const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, -0.5, y);
    },
    'building-1': (x, y) => {
        const height = 1;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.position.set(x, height / 2, y);
    },
    'building-2': (x, y) => {
        const height = 2;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.scale.set(1, height, 1);
        buildingMesh.position.set(x, height / 2, y);
    },
    'building-3': (x, y) => {
        const height = 3;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.scale.set(1, height, 1);
        buildingMesh.position.set(x, height / 2, y);
    },
}

export function createAssetInstance(assetId, x, y) {
    if (assetId in assets) {
        return assets[assetId](x, y);
    } else {
        console.warn('Asset not found:', assetId);
        return undefined
    }
}