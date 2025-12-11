import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, Banknote, Dna, Map as MapIcon, Milestone, Share2, Users } from "lucide-react"
import Link from "next/link"

const mapFeatures = [
  {
    title: "Genogram",
    description: "Visualize family relationships and history.",
    icon: Users,
    href: "/dashboard/genogram",
    ai: true,
  },
  {
    title: "Ecomap",
    description: "Illustrate social and environmental systems.",
    icon: MapIcon,
    href: "/dashboard/ecomap",
    ai: true,
  },
  {
    title: "Social Network Diagram",
    description: "Map out connections and interactions.",
    icon: Share2,
    href: "/dashboard/social-network",
  },
  {
    title: "Life Road Map",
    description: "Chart significant life events and future goals.",
    icon: Milestone,
    href: "/dashboard/life-road-map",
  },
  {
    title: "Genetics Map",
    description: "Track phenotypes and genotypes.",
    icon: Dna,
    href: "/dashboard/genetics",
  },
  {
    title: "Financial Map",
    description: "Manage savings, loans, investments, and taxes.",
    icon: Banknote,
    href: "/dashboard/finances",
  },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Maplify</h1>
        <p className="text-muted-foreground">Choose a map type to get started.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mapFeatures.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <feature.icon className="w-8 h-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                {feature.ai && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    AI
                  </span>
                )}
              </div>
              <CardDescription className="pt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  Create Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
