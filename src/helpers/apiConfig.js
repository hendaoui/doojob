export const apiConfig = {
  baseUrl: 'http://192.168.1.9:3000/',
  API: {
    AUTH: {
      LOGIN: 'auth/signin',
      REGISTER: 'auth/signup',
    },
    PROFILE: {
      VERIFY_ACCOUNT: "user/verify_account",
    },
    ISSUE: {
      LIST: "issue/list",
      GET_ISSUE_BY_ID: "issue/",
      CREATE: "issue/create",
    }
  },
};

