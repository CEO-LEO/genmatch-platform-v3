// Firebase configuration and utilities
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  getMessaging, 
  getToken, 
  onMessage,
  isSupported 
} from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = isSupported() ? getMessaging(app) : null;

// Firebase Authentication utility class
export class FirebaseAuth {
  static async signIn(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign in failed: ${error}`);
    }
  }

  static async signUp(email: string, password: string, displayName?: string): Promise<FirebaseUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign up failed: ${error}`);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Sign out failed: ${error}`);
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(`Password reset failed: ${error}`);
    }
  }

  static async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    try {
      await confirmPasswordReset(auth, code, newPassword);
    } catch (error) {
      throw new Error(`Password confirmation failed: ${error}`);
    }
  }

  static onAuthStateChange(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }
}

// Firestore Database utility class
export class FirestoreDB {
  static async createDocument(collectionName: string, data: any, docId?: string): Promise<string> {
    try {
      if (docId) {
        await setDoc(doc(db, collectionName, docId), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return docId;
      } else {
        const docRef = await addDoc(collection(db, collectionName), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return docRef.id;
      }
    } catch (error) {
      throw new Error(`Create document failed: ${error}`);
    }
  }

  static async getDocument(collectionName: string, docId: string): Promise<any> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Get document failed: ${error}`);
    }
  }

  static async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw new Error(`Update document failed: ${error}`);
    }
  }

  static async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(`Delete document failed: ${error}`);
    }
  }

  static async queryDocuments(
    collectionName: string, 
    conditions: Array<{ field: string; operator: any; value: any }> = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'desc',
    limitCount?: number
  ): Promise<any[]> {
    try {
      let q = collection(db, collectionName);
      
      // Apply where conditions
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
      
      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Query documents failed: ${error}`);
    }
  }
}

// Firebase Storage utility class
export class FirebaseStorage {
  static async uploadFile(
    path: string, 
    file: File, 
    metadata?: any
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw new Error(`File upload failed: ${error}`);
    }
  }

  static async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      throw new Error(`File deletion failed: ${error}`);
    }
  }

  static async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw new Error(`Get download URL failed: ${error}`);
    }
  }
}

// Firebase Messaging utility class
export class FirebaseMessaging {
  static async requestPermission(): Promise<boolean> {
    if (!messaging) return false;
    
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Notification permission request failed:', error);
      return false;
    }
  }

  static async getToken(): Promise<string | null> {
    if (!messaging) return null;
    
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return token;
    } catch (error) {
      console.error('Get token failed:', error);
      return null;
    }
  }

  static onMessage(callback: (payload: any) => void): (() => void) | null {
    if (!messaging) return null;
    
    try {
      return onMessage(messaging, callback);
    } catch (error) {
      console.error('Message listener setup failed:', error);
      return null;
    }
  }
}

// Utility functions
export const firebaseUtils = {
  // Generate unique document ID
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  // Convert Firebase timestamp to Date
  timestampToDate: (timestamp: any): Date => {
    if (timestamp?.toDate) {
      return timestamp.toDate();
    }
    return new Date(timestamp);
  },

  // Convert Date to Firebase timestamp
  dateToTimestamp: (date: Date) => {
    return serverTimestamp();
  },

  // Sanitize data for Firestore
  sanitizeData: (data: any): any => {
    const sanitized: any = {};
    
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          sanitized[key] = serverTimestamp();
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          sanitized[key] = firebaseUtils.sanitizeData(value);
        } else {
          sanitized[key] = value;
        }
      }
    });
    
    return sanitized;
  }
};

// Export Firebase instances
export { app, auth, db, storage, messaging };

// Export default Firebase utilities
export default {
  auth: FirebaseAuth,
  db: FirestoreDB,
  storage: FirebaseStorage,
  messaging: FirebaseMessaging,
  utils: firebaseUtils
};
