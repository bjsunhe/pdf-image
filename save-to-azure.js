const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

// Replace with your connection string
const AZURE_STORAGE_CONNECTION_STRING = '';

async function uploadImageToBlob(imagePath) {
    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Get a reference to a container
    const containerName = 'images'; // Name of the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container if it does not exist
    await containerClient.createIfNotExists();

    // Get a block blob client
    const blobName = path.basename(imagePath);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload data to the blob
    const data = fs.readFileSync(imagePath);
    await blockBlobClient.uploadData(data);

    // Get the URL of the uploaded image
    const imageUrl = blockBlobClient.url;
    return imageUrl;
}

const imagePath = 'output/2404.15153v1-3.png-03.png'; // Replace with the path to your image

uploadImageToBlob(imagePath)
    .then(imageUrl => {
        console.log(`Image uploaded to Azure Blob Storage. URL: ${imageUrl}`);
    })
    .catch(error => {
        console.error('Error uploading image to Azure Blob Storage:', error.message);
    });
