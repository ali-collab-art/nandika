import { EcomapForm } from "@/components/ecomap-form";

export default function EcomapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Automated Ecomap</h1>
        <p className="text-muted-foreground">
          Describe your social and environmental context to generate an ecomap.
        </p>
      </div>
      <EcomapForm />
    </div>
  );
}
