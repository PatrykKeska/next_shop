import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";
import { CartStateProvider } from "@/components/Cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";
import { ModalsStateProvider } from "@/components/Modals/ModalsContext";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ModalsStateProvider>
          <QueryClientProvider client={queryClient}>
            <CartStateProvider>
              <Layout>
                <DefaultSeo {...SEO} />
                <Component {...pageProps} />
              </Layout>
            </CartStateProvider>
          </QueryClientProvider>
        </ModalsStateProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
