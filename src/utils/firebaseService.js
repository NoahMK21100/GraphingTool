import { auth, db } from '../config/firebase.js';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';

export class FirebaseService {
    static async signInWithGoogle() {
        console.log('FirebaseService: Starting Google sign in');
        const provider = new GoogleAuthProvider();
        try {
            console.log('FirebaseService: Calling signInWithPopup');
            const result = await signInWithPopup(auth, provider);
            console.log('FirebaseService: Sign in successful', result);
            return result.user;
        } catch (error) {
            console.error('FirebaseService: Sign in error:', error);
            throw error;
        }
    }

    // ... rest of the class
} 