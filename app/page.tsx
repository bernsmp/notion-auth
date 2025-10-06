import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

export default async function Home() {
  // Redirect to view page if already logged in
  if (await isAuthenticated()) {
    redirect("/view");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-[#efefee] via-white to-[#efefee]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#000000' }}>
            Inner Circle Resources
          </h1>
          <p className="text-muted-foreground">
            Secure access to exclusive resources
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
