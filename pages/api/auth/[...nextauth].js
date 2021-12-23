import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// EMAIL PROVIDER SETTINGS
import { html, text } from "../../../utils/htmlEmail";

// NODEMAILER
import nodemailer from "nodemailer";

const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        console.log("Sending verification email papu");
        console.log(
          "Email:",
          email,
          "url",
          url,
          "server",
          server,
          "From",
          from
        );
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      return Promise.resolve(session);
    },
  },
  pages: { signIn: "/login" },
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
