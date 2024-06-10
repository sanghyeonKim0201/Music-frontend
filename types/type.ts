interface Playlist {
  kind: string;
  etag: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Items[];
}
interface Items {
  kind: string;
  etag: string;
  id?: string;
  snippet?: {
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
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
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
  };
  status?: {
    privacyStatus?: string;
  };
  contentDetails?: {
    itemCount: number;
  };
}
