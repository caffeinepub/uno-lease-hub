import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function YouTubeShortsSection() {
  // Curated list of UnityNodesIO YouTube Shorts for ULO signup/management
  // TODO: Replace these with actual UnityNodesIO Shorts video IDs from https://www.youtube.com/@UnityNodesIO/shorts
  const videos = [
    {
      id: 'm5B985cRons', // Example Unity Nodes setup guide - replace with actual UnityNodesIO Shorts ID
      title: 'ULO Signup Guide',
      description: 'Learn how to sign up and get started with Unity Operator Licenses',
    },
    {
      id: 'yAqpPAHMzPY', // Example Unity SDK installation - replace with actual UnityNodesIO Shorts ID
      title: 'Managing Your ULO',
      description: 'Step-by-step guide to managing your Unity Operator License',
    },
    {
      id: 'SBmCj7Lf1W4', // Example Unity Nodes overview - replace with actual UnityNodesIO Shorts ID
      title: 'ULO Leasing Basics',
      description: 'Understanding the basics of leasing Unity Operator Licenses',
    },
  ];

  return (
    <section className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-emerald-500/10">
            <PlayCircle className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-500" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-foreground">Instructional Videos</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Watch these helpful guides from UnityNodesIO on ULO signup and management
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">{video.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">{video.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-hidden min-w-0" style={{ paddingBottom: '177.78%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0 }}
                />
              </div>
              <div className="p-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Watch on YouTube
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Visit the{' '}
          <a
            href="https://www.youtube.com/@UnityNodesIO/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            UnityNodesIO YouTube channel
          </a>{' '}
          for more helpful videos
        </p>
      </div>
    </section>
  );
}
