import { ELASTIC_PASSWORD, ELASTIC_URSERNAME } from "./config";

export const MAIN_VECTORS_LENGTH = 512;

export const ELASTIC_AUTH = {
  username: ELASTIC_URSERNAME || 'elastic',
  password: ELASTIC_PASSWORD || 'password'
};

export const MAC_CONCURRENT_DOWNLOAD_PROCESSES = 2
export const MAC_CONCURRENT_INDEXING_PROCESSES = 2


export const NOTIFICATION_TYPE = {
  notFound: 'not_found',
  result: 'found',
}

export const MESSAGES = {
  noResult: 'No result',
  noResultDescription: 'We were unable to find anything.',
  success: 'Video successfully finded. Click to check.'
}