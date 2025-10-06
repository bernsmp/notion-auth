"use client";

import { Card } from "@/components/ui/card";

interface NotionEmbedProps {
  url: string;
}

export function NotionEmbed({ url }: NotionEmbedProps) {
  return (
    <Card className="w-full h-full overflow-hidden">
      <iframe
        src={url}
        className="w-full h-full min-h-screen border-0"
        title="Notion Page"
        loading="lazy"
      />
    </Card>
  );
}
