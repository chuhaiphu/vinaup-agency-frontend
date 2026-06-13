export interface TechNewsArticleResponse {
  id: number;
  title: string;
  endpoint: string;
  categoryEndpoint: string;
  mainImageUrl: string;
  galleryImageUrls?: string[];
  likes: number;
  views: number;
  content: string;
}

export interface TechNewsCategory {
  id: number;
  title: string;
  endpoint: string;
}
