import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";
import { CartStateProvider } from "@/components/Cart/CartContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </CartStateProvider>
    </ApolloProvider>
  );
}
