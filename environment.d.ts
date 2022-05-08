declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production'
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_reCAPTCHA: string
      NEXT_PUBLIC_apiKey: string
      NEXT_PUBLIC_authDomain: string
      NEXT_PUBLIC_projectId: string
      NEXT_PUBLIC_storageBucket: string
      NEXT_PUBLIC_messagingSenderId: string
      NEXT_PUBLIC_appId: string
      NEXT_PUBLIC_measurementId: string
    }
  }
}

export {}
