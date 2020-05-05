const sessionApi = async ({ session }) => ({
  ...session,
});

sessionApi.options = {
  reloadSessionUser: true,
  setSessionCookies: true,
};

export default sessionApi;
