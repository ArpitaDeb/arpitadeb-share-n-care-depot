require('dotenv').config();
const { Storage } = require('@google-cloud/storage');

const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT, 'base64').toString('utf8'));

const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: serviceAccount
});

module.exports = storage;