import { DefaultSeoProps } from 'next-seo';

const title= "Next sklep w ramach Nauki Next-GraphQL";
  const description ="Nauka NextJS opartego o TypeScript oraz GraphQL w branzy";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph:{
    title,
    description,
    
    siteName: "Next Sklep",
  }}


export default config;