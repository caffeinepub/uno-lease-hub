import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export default function YouTubeShortsSection() {
  // Curated list of UnityNodesIO YouTube Shorts for ULO signup/management
  // Replace these IDs with actual UnityNodesIO Shorts video IDs
  const videos = [
    {
      id: 'VIDEO_ID_1', // Replace with actual YouTube Shorts ID
      title: 'ULO Signup Guide',
      description: 'Learn how to sign up and get started with Unity Operator Licenses',
    },
    {
      id: 'VIDEO_ID_2', // Replace with actual YouTube Shorts ID
      title: 'Managing Your ULO',
      description: 'Step-by-step guide to managing your Unity Operator License',
    },
    {
      id: 'VIDEO_ID_3', // Replace with actual YouTube Shorts ID
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
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 0 }}
                />
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
