/*
  In this file we store application channels, we use this channels to communicate between rabbitmq and nodejs
*/

export const START_DOWNLOAD_CHANNEL = 'start_download'
export const NEW_DOWNLOAD_CHANNEL = 'new_download'
export const SUCCESS_DOWNLOAD_CHANNEL = 'download_success'
export const ERROR_DOWNLOAD_CHANNEL = 'download_error'
export const START_INDEXING_CHANNEL = 'start_indexing'
export const INDEXING_CUTTING_FRAMES_COMPLETE_CHANNEL = 'indexing_cutting_frames_complete'
export const INDEXING_FEATURE_VECTORS_COMPLETED_CHANNEL = 'indexing_feature_vector_completed'
export const CHANGE_STATUS_CHANNEL = 'change_status'
export const FEATURE_VECTORS_PROGRESS_CHANNEL = 'feature_vectors_progress'
export const VECTORS_FROM_IMAGE = 'vectors_from_image'
export const COMPARE_VECTORS = 'compare_vectors'
export const COMPARE_VECTORS_COMPLETED = 'compare_vectors_completed'
export const COMPARE_VECTORS_REPLY = 'compare_vectors_reply_queue'
export const VECTORS_FROM_IMAGE_COMPLETED = 'vectors_from_image_completed'
export const VIDEO_DETAILS_FETCH = 'video_details_fetch'
export const VIDEO_DETAILS_FETCH_COMPLETED = 'video_details_fetch_completed'
export const RUN_SCRAPER = "run_scraper_queue";
export const RECEIVED_VIDEOS = "movies_list_queue";
export const ERROR_SCRAPER = "scraper_error";
