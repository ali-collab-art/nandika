import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export default function SocialNetworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Network Diagram</h1>
        <p className="text-muted-foreground">
          This feature is currently under construction.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-4">
                <Share2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">We are working hard to bring you the Social Network Diagram feature. Stay tuned!</p>
        </CardContent>
      </Card>
    </div>
  );
}
