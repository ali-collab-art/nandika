import { GenogramForm } from "@/components/genogram-form";

export default function GenogramPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Automated Genogram</h1>
        <p className="text-muted-foreground">
          Enter family data as a structured JSON to generate a genogram automatically.
        </p>
      </div>
      <GenogramForm />
    </div>
  );
}
