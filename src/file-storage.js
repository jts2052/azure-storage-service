const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

function createBlobService(accountName, accessKey) {
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accessKey);
    return new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
}

async function getImage(accountName, accessKey, imagePath) {
    const blobService = createBlobService(accountName, accessKey);

    const containerName = "philosophers";
    const containerClient = blobService.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(imagePath);

    const properties = await blobClient.getProperties();
    const response = await blobClient.download();
    return [response, properties];
}

module.exports = { getImage };