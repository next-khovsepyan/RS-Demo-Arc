export interface IDownloadRequest {
  imdbId: string;
  title: string;
  videoUrl: string;
  source: string;
  status: string;
  featuredVideoYoutubeLink: string | null;
  fileType: string;
}

export interface IDownloadCompletedRequest {
  outputPathSystem: string;
  outputFeaturedPathSystem: string;
  id: string;
}

export interface IVideoDetailsCompletedRequest {
  videoId: string;
  results: any;
}

export interface IIndexImageCutCompleteRequest {
  id: string;
  total_vectors: number;
}

export interface IFeatureVectorsCompletedRequest {
  id: string;
  json_file_path: string;
  model: string;
}

export interface IFeatureVectorProgressRequest {
  id: string;
  progress: number;
}

export interface IVectorFromImageCompleted {
  id: string;
  vector: string;
}

export interface IVideoStore {
  id: string;
  jsonFilePath: string;
}

export interface IElasticStore {
  id: string;
}

export interface IScrapMovie {
  url: string;
  alternate_name: string;
  youtube_url: string;
  imdbId: string;
}

export interface IErrorMessage {
  message: string;
}
