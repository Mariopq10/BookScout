export interface GoogleUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  idToken: string;
  refreshToken:string;
  oauthAccessToken:string|null;
}
