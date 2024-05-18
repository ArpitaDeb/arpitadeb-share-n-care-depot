const fs = require('fs');
const path = require('path');

const { Storage } = require('@google-cloud/storage');

const serviceAccountPath = path.join(__dirname, '../credentials/sharencare-422805-bf2ec8fd49b2.json');
const serviceAccount = fs.readFileSync(serviceAccountPath, 'utf8');
const encodedServiceAccount = Buffer.from(serviceAccount).toString('base64');

console.log(encodedServiceAccount);

// const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT, 'base64').toString('utf8'));

const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: serviceAccount
});

module.exports = storage;