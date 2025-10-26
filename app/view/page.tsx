"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, LogOut, Clock, Lock } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function ViewPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const notionUrl = process.env.NEXT_PUBLIC_NOTION_PAGE_URL || "";

  const handleAccessContent = () => {
    window.open(notionUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#efefee] via-white to-[#efefee]">
      <header className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Inner Circle" className="w-10 h-10 object-contain" style={{ mixBlendMode: 'multiply' }} />
            <h1 className="text-xl font-bold" style={{ color: '#000000' }}>
              Inner Circle Resources
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-32 h-32 mb-4">
              <img src="/logo.png" alt="Inner Circle" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
            </div>
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: '#000000' }}>
              Welcome!
            </h2>
            <p className="text-muted-foreground text-xl max-w-md mx-auto">
              You now have secure access to the Inner Circle
            </p>
          </div>

          <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95">
            <CardHeader className="space-y-3 pb-6">
              <CardTitle className="text-3xl" style={{ color: '#000000' }}>
                Inner Circle Resources
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Click below to access your exclusive Inner Circle resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RainbowButton
                onClick={handleAccessContent}
                className="w-full text-lg h-16 font-semibold flex items-center justify-center gap-3"
              >
                <ExternalLink className="h-6 w-6" />
                Access Inner Circle Resources
              </RainbowButton>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <Clock className="w-4 h-4" />
                <span>Your session is valid for 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" style={{ color: '#008dda' }} />
                Secure Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your session is encrypted and secure
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
