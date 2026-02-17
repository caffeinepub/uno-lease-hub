import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Search, Copy, Smartphone, ExternalLink, AlertCircle, HelpCircle } from 'lucide-react';
import YouTubeShortsSection from '../components/media/YouTubeShortsSection';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: 'Browse Listings',
      description: 'Explore available ULO lease code opportunities.',
    },
    {
      icon: Copy,
      title: 'Copy the Lease Code',
      description: 'Found a listing you like? Copy the code for use in the Unity App',
    },
    {
      icon: Smartphone,
      title: 'Use in Unity App',
      description: 'Open the Unity mobile app and enter the lease code to activate your Unity License Operator capacity.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-8 sm:mb-12 text-center px-4">
        <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold text-foreground">How It Works</h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
          This ICP-powered app makes it simple to connect ULO lease providers with those seeking Unity Operator License capacity.
        </p>
        <div className="mt-4">
          <a 
            href="https://unitynodes.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Learn more about UnityNodes
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="mb-12 sm:mb-16 grid gap-6 sm:gap-8 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Icon className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl">{step.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* What is a ULO Lease Code */}
      <Card className="mb-8 sm:mb-12">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">What is a ULO Lease Code?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
          <p>
            A <strong className="text-foreground">Unity License Operator (ULO) lease code</strong> is a unique identifier that grants you access to run a Unity Operator License within the Unity mobile application. This code represents leased capacity from a Unity Node Operator (UNO) who owns and operates Unity Node infrastructure.
          </p>
          <p>
            Each lease code is tied to specific parameters including location, area coverage, and capacity. When you enter a valid lease code into the Unity app, you gain the ability to operate as a Unity License Operator within the defined parameters of that lease.
          </p>
          <p>
            <strong className="text-foreground">Important:</strong> The Unity app itself is not ICP-powered. Only this marketplace website runs on the Internet Computer blockchain. The Unity app is a separate mobile application where you use the lease codes obtained from this platform.
          </p>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card className="mb-8 sm:mb-12 border-emerald-500/20 bg-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-emerald-500" />
            Before You Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            To successfully obtain and use a ULO lease code, make sure you have:
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground list-disc list-inside ml-2">
            <li>The Unity mobile app installed on your device (available for iOS and Android)</li>
            <li>A basic understanding of Unity Nodes and the Unity License Operator role</li>
            <li>Access to this marketplace to browse available lease code listings</li>
            <li>A way to copy and paste the lease code (or manually enter it into the Unity app)</li>
          </ul>
          <p className="text-sm sm:text-base text-muted-foreground pt-2">
            <strong className="text-foreground">Note:</strong> You do not need an Internet Identity or account on this website to browse listings and copy lease codes. Authentication is only required if you want to become a UNO and list your own lease codes.
          </p>
        </CardContent>
      </Card>

      {/* Detailed Instructions */}
      <Card className="mb-8 sm:mb-12">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Step-by-Step: How to Get and Use a Lease Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">1</span>
              Browse Available Listings
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground ml-9">
              Visit the <Link to="/listings" className="text-emerald-500 hover:text-emerald-400 underline">Listings page</Link> to explore all available ULO lease code opportunities. Each listing displays the lease code you'll need to copy.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">2</span>
              Copy the Lease Code
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground ml-9">
              Once you've found a listing that meets your requirements:
            </p>
            <ol className="space-y-2 text-sm sm:text-base text-muted-foreground list-decimal list-inside ml-11">
              <li>Click the copy button next to the lease code (or manually select and copy the code)</li>
              <li>The code is now saved to your clipboard and ready to use</li>
            </ol>
            <p className="text-sm sm:text-base text-muted-foreground ml-9 pt-2">
              <strong className="text-foreground">Tip:</strong> Make sure to copy the entire code accurately. Lease codes are case-sensitive and must be entered exactly as shown.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">3</span>
              Enter Code in Unity App
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground ml-9">
              With the lease code copied, open the Unity mobile app on your device:
            </p>
            <ol className="space-y-2 text-sm sm:text-base text-muted-foreground list-decimal list-inside ml-11">
              <li>Launch the Unity app on your mobile device</li>
              <li>Navigate to the ULO section or license activation area</li>
              <li>Find the "Enter Lease Code" or similar input field</li>
              <li>Paste (or manually type) the lease code you copied</li>
              <li>Confirm and activate the lease code</li>
            </ol>
            <p className="text-sm sm:text-base text-muted-foreground ml-9 pt-2">
              Once activated, you'll be able to operate as a Unity License Operator with the parameters defined by that lease code. The Unity app will guide you through any additional setup steps required.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="mb-8 sm:mb-12 border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-orange-500" />
            Common Issues & Troubleshooting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Lease code not working in Unity app</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Ensure you've copied the entire code without any extra spaces or characters. Lease codes are case-sensitive. If the issue persists, the code may have been deactivated by the listing owner.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Listing shows as archived</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Archived listings are no longer active. The UNO has removed this lease code from availability. Browse other active listings instead.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Can't find the right listing</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Use the filter options on the Listings page to narrow your search by location, area, or capacity. New listings are added regularly, so check back often.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Need help with the Unity app itself</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              For questions about the Unity mobile app, visit <a href="https://unitynodes.io" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 underline">unitynodes.io</a> for official documentation and support resources.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8 sm:mb-12">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Do I need to create an account to get a lease code?</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              No. You can browse listings and copy lease codes without signing in. Internet Identity authentication is only required if you want to become a UNO and create your own listings.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">How many lease codes can I use?</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              There is no limit on this marketplace. However, the Unity app may have its own restrictions on how many active lease codes you can operate simultaneously. Check the Unity app documentation for details.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Are lease codes permanent?</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Lease codes remain active as long as the UNO keeps the listing active. UNOs can archive listings at any time, which may deactivate associated lease codes. Always verify a listing is still active before using its code.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Can I become a UNO and list my own lease codes?</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Yes! If you operate Unity Node infrastructure, you can sign in with Internet Identity and create listings from your dashboard. This allows you to offer ULO lease codes to others.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Is this website the official Unity app?</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              No. This is an independent ICP-powered marketplace for ULO lease codes. The Unity mobile app is a separate application. For official Unity information, visit <a href="https://unitynodes.io" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 underline">unitynodes.io</a>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Instructional Videos Section */}
      <YouTubeShortsSection />
    </div>
  );
}
