import { Button } from "@/components/ui/button";

interface SheetEmbedProps {
  url: string;
  title?: string;
  height?: number;
}

export function SheetEmbed({ url, title = "Linked Sheet", height = 800 }: SheetEmbedProps) {
  // Use provided embed URL as-is; only add action=embedview if missing
  const hasEmbedAction = /[?&]action=embedview/i.test(url);
  const embedUrl = hasEmbedAction
    ? url
    : url.includes("?")
    ? `${url}&action=embedview`
    : `${url}?action=embedview`;

  const openInNewTab = () => window.open(url, "_blank");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Button variant="outline" size="sm" onClick={openInNewTab}>
          Open in new tab
        </Button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <iframe
          title={title}
          src={embedUrl}
          style={{ width: "100%", height: `${height}px`, border: "0" }}
          allow="fullscreen"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Note: If the sheet doesn't render here, your SharePoint tenant may block embedding. Use the
        button above or generate an "Embed" link from SharePoint/Excel Online.
      </p>
    </div>
  );
}
