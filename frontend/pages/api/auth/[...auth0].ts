import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

export default handleAuth({
  callback: handleCallback({
    afterCallback: async (req, res, session, state) => {
      // accessToken をセッションに含める
      return {
        ...session,
        accessToken: session.accessToken,
      };
    },
  }),
});
