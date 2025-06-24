declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_USER: string;
    EMAIL_PASS: string;
    RECEIVER_EMAIL: string;
  }
}

interface NodemailerError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
}