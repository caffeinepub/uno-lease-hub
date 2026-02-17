import { ExternalLink } from 'lucide-react';

export default function GetUnityNetworkAppSection() {
  return (
    <section className="border-t border-border bg-accent/5">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/unitynodes-logo-wordmark.dim_1200x300.png"
              alt="UnityNodes"
              className="h-12 sm:h-16 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-foreground">
              Get the Unity Network App
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Download the official Unity Network mobile app from the Apple App Store or Google Play Store to access your Unity Network account on the go.
            </p>
            <p className="mt-3 text-sm text-muted-foreground flex items-center justify-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Links open external app store pages
            </p>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <a
              href="https://apps.apple.com/us/app/unity-network-app/id6755482738"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="Download on the Apple App Store"
            >
              <img
                src="/assets/generated/app-store-badge.dim_512x152.png"
                alt="Download on the App Store"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=io.unitynodes.unityapp"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="Get it on Google Play"
            >
              <img
                src="/assets/generated/google-play-badge.dim_512x152.png"
                alt="Get it on Google Play"
                className="h-12 sm:h-14 w-auto"
              />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Note: The Unity Network mobile app is a separate application. This website (ULO Lease Hub) is powered by the Internet Computer blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
