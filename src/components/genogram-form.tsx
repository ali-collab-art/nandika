"use client";

import { useState } from "react";
import { generateGenogram } from "@/ai/flows/genogram-generation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";

export function GenogramForm() {
  const [familyData, setFamilyData] = useState("");
  const [genogramResult, setGenogramResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const isDataURI = (str: string) => str.startsWith('data:image');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGenogramResult(null);

    try {
      if (!familyData.trim()) {
        setError("Family data cannot be empty.");
        setIsLoading(false);
        return;
      }
      try {
        JSON.parse(familyData);
      } catch (jsonError) {
        setError("Invalid JSON format. Please check your input.");
        setIsLoading(false);
        return;
      }
      
      const result = await generateGenogram({ familyData });
      setGenogramResult(result.genogramVisualization);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Genogram",
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
          <CardTitle>Family Data Input</CardTitle>
          <CardDescription>
            Provide family details in JSON format. Include names, relationships, and key life events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="family-data">JSON Family Data</Label>
            <Textarea
              id="family-data"
              placeholder='[{"name": "John Doe", "gender": "Male", "birth_date": "1970-01-01"}, ...]'
              value={familyData}
              onChange={(e) => setFamilyData(e.target.value)}
              rows={10}
              className="font-code"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">The AI will generate the map based on this data.</p>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Genogram
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

      {genogramResult && (
        <Card className="m-6 mt-0">
          <CardHeader>
            <CardTitle>Generated Genogram</CardTitle>
          </CardHeader>
          <CardContent>
            {isDataURI(genogramResult) ? (
              <Image src={genogramResult} alt="Generated Genogram" width={800} height={600} className="w-full h-auto" />
            ) : (
              <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
                <code>{genogramResult}</code>
              </pre>
            )}
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
