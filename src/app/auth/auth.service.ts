import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, UserCredential, OAuthCredential } from 'firebase/auth';
import { GoogleUser } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessToken!: string | null ;
  public user! : GoogleUser


  constructor(private afAuth: AngularFireAuth, private router : Router) {
    if(this.user!=null){

    }
  }

  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async googleLogin(): Promise<GoogleUser | null> {

      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/books');
      try {
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user && result.credential) {
        let accessToken: string | undefined;
        const credential = OAuthCredential.fromJSON(result.credential.toJSON());
        accessToken = credential?.accessToken;
        const user = result.user;

        const googleUser: GoogleUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          idToken: await user.getIdToken(),
          refreshToken:user.refreshToken,
          oauthAccessToken: accessToken ?? ""
        };
        this.accessToken=googleUser.oauthAccessToken
        console.log(googleUser)
        this.user= googleUser
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
    await this.afAuth.signOut();
    localStorage.clear()
    this.accessToken=""
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
