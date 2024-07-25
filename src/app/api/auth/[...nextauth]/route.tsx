import NextAuth, { NextAuthOptions } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      authorize: async (credentials) => {
        if (credentials?.username != '' && credentials?.password != '') {
          return { name: credentials?.username };
        }
        return null;
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? '',
    // }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
