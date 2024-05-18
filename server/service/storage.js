const fs = require('fs');
const path = require('path');

const { Storage } = require('@google-cloud/storage');

const serviceAccountPath = path.join(__dirname, '../credentials/sharencare-422805-bf2ec8fd49b2.json');
const encodeserviceAccount = fs.readFileSync(serviceAccountPath, 'utf8');
const encodedServiceAccount = Buffer.from(encodeserviceAccount).toString('base64');

console.log("servc", encodedServiceAccount);

const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT, 'base64').toString('utf8'));
console.log("line13", serviceAccount);
const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: serviceAccount
});

module.exports = storage;