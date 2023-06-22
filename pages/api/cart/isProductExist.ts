import { authorizatedApolloClient } from "@/graphql/apolloClient";
import {
  IsProductExistDocument,
  IsProductExistQuery,
  IsProductExistQueryVariables,
} from "@/graphql/generated/graphql";

export const isProductExist = async (slug: string) => {
  const response = await authorizatedApolloClient.query<
    IsProductExistQuery,
    IsProductExistQueryVariables
  >({
    query: IsProductExistDocument,
    variables: {
      slug: slug,
    },
  });
  if (response.data.product?.id) {
    return true;
  } else {
    return false;
  }
};
