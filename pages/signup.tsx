import { SignupLayout } from "@/components/Signup/SignupLayout";
import { SignupForm } from "@/components/Signup/SingupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
interface SignupPageProps {}

const SignupPage = ({}: SignupPageProps) => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/");
    return null;
  } else {
    return (
      <>
        <SignupLayout>
          <SignupForm />
        </SignupLayout>
      </>
    );
  }
};

export default SignupPage;
