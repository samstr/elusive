const sessionAPI = async ({ session }) => ({
  session,
});

sessionAPI.options = {
  reloadSessionUser: true,
  setSessionCookies: true,
};

export default sessionAPI;
