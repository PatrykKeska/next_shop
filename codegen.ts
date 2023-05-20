import type { CodegenConfig } from "@graphql-codegen/cli";


const config: CodegenConfig = {
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clghsol111uq301ujawwkcsx8/master",
  documents: ["graphql/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./graphql/generated/graphql.tsx": {
      // preset: 'client',
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  overwrite: true,
};

export default config;
