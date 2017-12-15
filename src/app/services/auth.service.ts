import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: '2357z2wOtEpMFqwBjKkge73srrIFup8m',
    domain: 'behar.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/products',
    audience: 'https://api.oshop.com',
    scope: 'openid profile email',
    additionalSignUpFields: [
      {
        name: 'name',
        placeholder: 'Name'
      }
    ]
  });


  userProfile: any;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property
    // and update login status subject.
    // If not authenticated but there are still items
    // in localStorage, log out.
    const lsProfile = localStorage.getItem('profile');

    if (this.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.setLoggedIn(true);
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
    console.log('logged in:' && this.loggedIn);
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);

        console.log(authResult);

      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
      this.router.navigate(['/']);
    });

  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    // Set tokens and expiration in localStorage and props
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
  }

  logout() {
    // Ensure all auth items removed from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('authRedirect');
    // Reset local properties, update loggedIn$ stream
    this.userProfile = undefined;
    this.setLoggedIn(false);
    // Return to homepage
    this.router.navigate(['/']);
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
