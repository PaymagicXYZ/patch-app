import { SocialProfile, SupportedSocialNetworkIds } from '@/types';
import { UserId, SocialNetwork as Network } from '@patchwallet/patch-sdk';

type ResolveResponse = (username: string) => Promise<SocialProfile>;

const email = {
  name: 'email' as Network,
  logo: 'icon-park:email-down',
  apiUrl: 'https://api.sendgrid.com/v3/validations/email',
  apiKey: process.env.SENDGRID_API_KEY,
  url: 'mailto:',
  get resolveUser(): ResolveResponse {
    return async (userName: string) => {
      return fetch(`${this.apiUrl}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ email: userName, source: 'drop' }),
      })
        .then((response) => response.json())
        .then((data) => data?.result?.verdict !== 'Invalid')
        .then((isValid) => {
          if (isValid || /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userName)) {
            return {
              name: userName.split('@')[0],
              description: 'Email',
              image: '/email_circle.svg',
              handle: userName,
              network: this.name,
              patchUserId: `${this.name}:${userName}` as UserId,
            };
          } else {
            throw new Error('Invalid Email');
          }
        });
    };
  },
};

const twitter = {
  name: 'twitter' as Network,
  logo: 'icon-park:twitter',
  apiKey: process.env.TWITTER_TOKEN,
  apiUrl: 'https://api.twitter.com/2',
  url: 'https://twitter.com/',
  get resolveUser(): ResolveResponse {
    return async (userName: string) => {
      if (/^[a-zA-Z0-9_]{1,15}$/.test(userName)) {
        return fetch(`${this.apiUrl}/users/by/username/${userName}?user.fields=description,profile_image_url`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.apiKey}` },
        })
          .then(async (response) => response.json())
          .then((data) => {
            // console.log("DATA", data)
            if (data && data.data) {
              return {
                name: data.data.name,
                description: data.data.description,
                image: data.data.profile_image_url,
                handle: data.data.username,
                network: this.name,
                patchUserId: `${this.name}:${userName}` as UserId,
              };
            } else {
              return {
                name: userName,
                description: 'Twitter',
                image: '/twitter.svg',
                handle: userName,
                network: this.name,
                patchUserId: `${this.name}:${userName}` as UserId,
              };
            }
          });
      } else {
        throw new Error('Invalid Twitter username');
      }
    };
  },
};

const github = {
  name: 'github' as Network,
  logo: 'icon-park:github',
  apiKey: process.env.GITHUB_TOKEN,
  apiUrl: 'https://api.github.com',
  url: 'https://github.com/',
  get resolveUser(): ResolveResponse {
    return async (userName: string) => {
      return fetch(`${this.apiUrl}/users/${userName}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            return {
              name: data.name,
              description: data.bio,
              image: data.avatar_url,
              handle: data.login,
              network: this.name,
              patchUserId: `${this.name}:${userName}` as UserId,
            };
          } else {
            throw new Error('Invalid Github username');
          }
        });
    };
  },
};

const tel = {
  name: 'tel' as Network,
  logo: 'icon-park:phone-telephone',
  apiKey: process.env.TWILIO_API_KEY,
  apiUrl: 'https://lookups.twilio.com/v1/PhoneNumbers',
  url: 'tel:',
  get resolveUser(): ResolveResponse {
    return async (userName: string) => {
      return fetch(`${this.apiUrl}/${userName}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${this.apiKey}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          return {
            name: userName,
            description: 'Tel',
            image: '',
            handle: userName,
            network: this.name,
            patchUserId: `${this.name}:${userName}` as UserId,
          };
        } else {
          console.log('RESPONSE', response);
          throw new Error('Invalid Phone number');
        }
      });
    };
  },
};

const passphrase = {
  name: 'passphrase' as Network,
  logo: 'icon-park:github',
  get resolveUser(): ResolveResponse {
    return async (userName: string) => {
      return {
        name: 'Passphrase Wallet',
        description: 'Passphrase Wallet',
        image: '/passphrase.svg',
        handle: this.formatUsername(userName),
        network: this.name,
        patchUserId: `${this.name}:${userName}` as UserId,
      };
    };
  },
  formatUsername(userName: string) {
    return userName.length > 15 ? userName.substring(0, 14) + '...' : userName;
  },
};

const farcaster = {
  name: 'farcaster' as Network,
  logo: 'icon-park:farcaster',
  apiKey: process.env.NEYNAR_API_KEY,
  apiUrl: 'https://api.neynar.com/v1/farcaster',
  async resolveFarcasterUser(endpoint: string) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`FC API returned an error: ${response.statusText}`);
      }
      const data = await response.json();
      const profile = data.result.user;
      if (profile) {
        return {
          name: profile.displayName,
          description: profile.profile.bio.text,
          image: profile.pfp.url,
          handle: profile.username,
          network: this.name,
          patchUserId: `${this.name}:${profile.fid}` as UserId,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching recent reactions from FC:', error);
      throw error;
    }
  },
  async resolveByFID(fid: string) {
    const endpoint = `${this.apiUrl}/user/?api_key=${this.apiKey}&fid=${fid}`;
    return this.resolveFarcasterUser(endpoint);
  },
  get resolveByUsername() {
    return async (username: string) => {
      const endpoint = `${this.apiUrl}/user-by-username?api_key=${this.apiKey}&username=${username}`;
      return this.resolveFarcasterUser(endpoint);
    };
  },
  get resolveUser() {
    return async (fidOrUsername: string) => {
      const isInt = /^[0-9]+$/.test(fidOrUsername);
      try {
        if (isInt) return await this.resolveByFID(fidOrUsername);
        return await this.resolveByUsername(fidOrUsername);
      } catch (err) {
        return await this.resolveByUsername(fidOrUsername);
      }
    };
  },
};

export const supportedSocialNetworks = {
  email,
  twitter,
  github,
  tel,
  passphrase,
  //   farcaster, TODO: Uncomment this when FC is ready
};

export type SocialNetwork = keyof typeof supportedSocialNetworks;
