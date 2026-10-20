const fs = require('fs');
const buffer = fs.readFileSync('public/models/human_body.glb');
const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546C67) { console.error('Not a valid GLB'); process.exit(1); }
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkData = buffer.slice(20, 20 + jsonChunkLength);
const gltf = JSON.parse(jsonChunkData.toString('utf8'));
const meshes = gltf.meshes ? gltf.meshes.map(m => m.name) : [];
const nodes = gltf.nodes ? gltf.nodes.map(n => n.name) : [];
console.log(JSON.stringify({ meshes, nodes }, null, 2));
