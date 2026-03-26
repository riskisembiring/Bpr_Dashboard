import { db } from '../firebase/firebase.js';
import { doc, updateDoc, getDocs, query, where, collection } from 'firebase/firestore';

// Helper function to clean updates - remove undefined/null/empty values
const cleanUpdatesForFirestore = (updates) => {
  const cleaned = { ...updates };
  delete cleaned.username; // Always avoid overwriting username

  // Filter out invalid values
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === undefined || cleaned[key] === null || cleaned[key] === '') {
      delete cleaned[key];
    }
  });

  return cleaned;
};

// Update User Profile (for completing data: fullName, address, phone, etc.)
export const getUserByUsername = async (username) => {
  if (!username) {
    throw new Error('Username diperlukan');
  }

  // Find user by username
  const userSnapshot = await getDocs(
    query(collection(db, 'users'), where('username', '==', username))
  );
  
  if (userSnapshot.empty) {
    throw new Error('Pengguna tidak ditemukan');
  }
  
  const userDoc = userSnapshot.docs[0];
  return userDoc.data();
};

export const updateUserProfile = async (username, updates) => {
  if (!username) {
    throw new Error('Username diperlukan');
  }

  // Find user by username
  const userSnapshot = await getDocs(
    query(collection(db, 'users'), where('username', '==', username))
  );
  
  if (userSnapshot.empty) {
    throw new Error('Pengguna tidak ditemukan');
  }
  
  const userDoc = userSnapshot.docs[0];

  // Clean updates for Firestore
  const cleanUpdates = cleanUpdatesForFirestore(updates);

  if (Object.keys(cleanUpdates).length === 0) {
    return { message: 'Tidak ada data yang berubah.' };
  }

  // Update Firestore doc
  await updateDoc(doc(db, 'users', userDoc.id), cleanUpdates);

  return { 
    message: 'Data user berhasil diperbarui. Silahkan login kembali.' 
  };
};

export default updateUserProfile;

