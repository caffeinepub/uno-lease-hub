import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import GetUnityNetworkAppSection from '@/components/marketing/GetUnityNetworkAppSection';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-accent/5">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1600x900.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              ULO Lease Management Hub
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground md:text-xl px-4">
              A decentralized platform for managing Unity License Operator lease listings and requests, powered by the Internet Computer.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/listings">
                  Browse Available Leases
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/dashboard">List Your Lease</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-foreground">Why Use This Hub?</h2>
          <p className="text-base sm:text-lg text-muted-foreground">This app runs on the Internet Computer for secure, transparent lease management</p>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Shield className="h-6 w-6 text-emerald-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Secure & Transparent</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                All lease listings and requests are recorded on-chain, ensuring complete transparency and security.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Zap className="h-6 w-6 text-emerald-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Fast & Efficient</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Streamlined process from listing to approval. Connect with the right opportunities quickly.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Users className="h-6 w-6 text-emerald-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Community Driven</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Built for ULOs. Join a growing community managing Unity Operator License leases.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Unity Network App Download Section */}
      <GetUnityNetworkAppSection />

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center px-4">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground">
              Whether you're looking to lease ULO capacity or offer your own, this hub makes it simple.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/listings">Explore Leases</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
