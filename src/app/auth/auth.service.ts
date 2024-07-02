import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider, FacebookAuthProvider, User } from 'firebase/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { GoogleUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async googleLogin(): Promise<GoogleUser | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user && result.credential) {
        const user = result.user;
        const googleUser: GoogleUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          idToken: await user.getIdToken(),
          accessToken:""
        };

        return googleUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error en el login con Google:', error);
      return null;
    }
  }

  async facebookLogin() {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('user_friends');
    return await this.afAuth.signInWithPopup(provider);
  }

  async logout() {
    return await this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
