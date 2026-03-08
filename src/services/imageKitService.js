import axios from 'axios';
import FormData from 'form-data';

/**
 * Upload image to ImageKit via backend API
 * @param {string} base64Image - The base64 image data (without prefix)
 * @param {string} fileName - The name of the file
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImageToImageKit = async (base64Image, fileName) => {
  try {
    // Convert base64 to buffer-like format for the backend
    // The backend expects a file with buffer
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Create a Blob from the base64 data
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const formData = new FormData();
    
    // Append the blob as a file
    formData.append('file', blob, fileName || 'captured_image.jpg');
    formData.append('fileName', fileName || 'captured_image.jpg');
    formData.append('folder', 'bprNasnus');

    // Send to backend API
    const response = await axios.post(
      'https://api-nasnus.vercel.app/api/upload-imagekit',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Error uploading to ImageKit:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Alternative method using fetch API
 * @param {string} base64Image - The base64 image data
 * @param {string} fileName - The name of the file
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImageToImageKitFetch = async (base64Image, fileName) => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Convert base64 to blob
    const response = await fetch(`data:image/png;base64,${base64Data}`);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, fileName || 'captured_image.jpg');
    formData.append('fileName', fileName || 'captured_image.jpg');
    formData.append('folder', 'bprNasnus');

    const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const result = await uploadResponse.json();
    
    if (result && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid response from server');
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
    throw error;
  }
};

