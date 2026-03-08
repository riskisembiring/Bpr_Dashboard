// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAcQCn1NfGujTUIBAWr_Xe36kBEUKnk9JU',
  authDomain: 'project-bpr-6d9ae.firebaseapp.com',
  projectId: 'project-bpr-6d9ae',
  storageBucket: 'project-bpr-6d9ae.appspot.com',
  messagingSenderId: '1022500973352',
  appId: '1:1022500973352:web:5437bb09d8e09b94f67e1d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ImageKit Config
const IMAGEKIT_PUBLIC_KEY = '5AhqwfLNexuB';
const IMAGEKIT_PRIVATE_KEY = 'private_5AhqwfLNexuB+St9QoDexd+y5hs=';

export const uploadImageToImageKit = async (dataUrl, folder = 'collection') => {
  try {
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `${folder}/${timestamp}_${randomStr}.jpg`;
    
    // Remove data:image/jpeg;base64, prefix if present
    let base64Data = dataUrl;
    if (dataUrl.includes(',')) {
      base64Data = dataUrl.split(',')[1];
    }

    // Using public key for client-side upload
    const response = await fetch(`https://upload.imagekit.io/api/v1/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64Data,
        fileName: fileName,
        publicKey: IMAGEKIT_PUBLIC_KEY,
      }),
    });

    const result = await response.json();
    console.log('ImageKit response:', result);
    
    if (result.url) {
      return result.url;
    } else {
      throw new Error(result.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
    throw error;
  }
};

export const uploadImageToFirebase = async (base64Data, folder = 'collection') => {
  try {
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(7);
    const fileName = `${folder}/${timestamp}_${randomStr}.jpg`;
    const storageRef = ref(storage, fileName);
    
    await uploadString(storageRef, base64Data, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export { db, addDoc, collection, storage };
