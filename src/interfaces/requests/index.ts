import { User } from "../../models/user.model";

export interface IReq extends Request {
    user: User
}
export interface IStoreWebhookDataRequest {
  json_file_path: string;
  imdb_id: string,
  movie_name: string,
  total_frames: number,
  model: string

}

export interface ISearchByVectorRequest {
  vector: number[];
  limit: number;
  model: string;
}

export interface IManualAddVideoRequest{
    title: string,
    imdbId: string,
    videoUrl: string,
    source: string,
    featuredVideoYoutubeLink: string | null,
    vectorPath: string
}