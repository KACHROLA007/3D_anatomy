const fs = require('fs');
const data = fs.readFileSync('public/models/human_body.glb');
const str = data.toString('utf8', 0, 100000);
const matches = str.match(/"name":"([^"]+)"/g);
console.log(matches);
