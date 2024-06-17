interface Playlists {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    status: {
      privacyStatus?: string;
    };
    contentDetails?: {
      itemCount: number;
    };
  }[];
}
interface Videos {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet & {
      tags: string[];
      categoryId: string;
      liveBroadcastContent: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard?: {
      url: string;
      width: number;
      height: number;
    };
    maxres?: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  localized: {
    title: string;
    description: string;
  };
}
