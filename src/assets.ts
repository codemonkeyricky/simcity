
import * as THREE from 'three';

export const geometry = new THREE.BoxGeometry(1, 1, 1);

type AssetFactory = (x: number, y: number) => THREE.Mesh;

const assets: Record<string, AssetFactory> = {
    'grass': (x: number, y: number) => {
        // grass
        const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {id: 'grass'};
        mesh.position.set(x, -0.5, y);
        return mesh;
    },
    'building-1': (x: number, y: number) => {
        const height = 1;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.position.set(x, height / 2, y);
        return buildingMesh;
    },
    'building-2': (x: number, y: number) => {
        const height = 2;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.scale.set(1, height, 1);
        buildingMesh.position.set(x, height / 2, y);
        return buildingMesh;
    },
    'building-3': (x: number, y: number) => {
        const height = 3;
        const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
        const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
        buildingMesh.scale.set(1, height, 1);
        buildingMesh.position.set(x, height / 2, y);
        return buildingMesh;
    },
}

export function createAssetInstance(assetId: string, x: number, y: number): THREE.Mesh {
    if (assetId in assets) {
        return assets[assetId](x, y);
    } else {
        console.warn('Asset not found:', assetId);
        throw new Error(`Asset not found: ${assetId}`);
    }
}