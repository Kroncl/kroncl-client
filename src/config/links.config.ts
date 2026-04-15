export const linksConfig = {
  registration: '/sso/sign_up',
  login: '/sso/sign_in',
  recovery: '/sso/recovery',
  createCompany: '/platform/companies/new',
  developerPortal: '/dev',
  developerFrontGithub: 'https://github.com/mainbotan/kroncl-client',

  get isProduction() {
    return process.env.NODE_ENV === 'production';
  }
};

export const authLinks = {
    registration: linksConfig.registration,
    login: linksConfig.login,
    recovery: linksConfig.recovery
};
export const accountActionsLinks = {
    createCompany: linksConfig.createCompany
};