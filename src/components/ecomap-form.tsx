"use client";

import { useState } from "react";
import { generateEcomap, type GenerateEcomapOutput } from "@/ai/flows/ecomap-generation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";

export function EcomapForm() {
  const [userData, setUserData] = useState("");
  const [ecomapResult, setEcomapResult] = useState<GenerateEcomapOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setEcomapResult(null);

    try {
      if (!userData.trim()) {
        setError("User data cannot be empty.");
        setIsLoading(false);
        return;
      }
      
      const result = await generateEcomap({ userData });
      setEcomapResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Ecomap",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Context Input</CardTitle>
          <CardDescription>
            Describe your connections with family, friends, work, school, and community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="user-data">Your Social & Environmental Context</Label>
            <Textarea
              id="user-data"
              placeholder="e.g., 'I live with my partner and our dog. I'm close to my sister who lives nearby. My workplace is stressful, but my colleagues are supportive...'"
              value={userData}
              onChange={(e) => setUserData(e.target.value)}
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">The AI will visualize your system based on this data.</p>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Ecomap
          </Button>
        </CardFooter>
      </form>

      {error && (
        <div className="p-4 pt-0">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {ecomapResult && (
        <Card className="m-6 mt-0">
          <CardHeader>
            <CardTitle>Generated Ecomap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="font-semibold mb-2">Ecomap Description</h3>
                <p className="text-sm text-muted-foreground">{ecomapResult.ecomapDescription}</p>
             </div>
             <div className="relative aspect-video w-full">
                <Image src={ecomapResult.ecomapImage} alt="Generated Ecomap" layout="fill" objectFit="contain" />
             </div>
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
