import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URL, ELASTIC_BUCKET, CURRENT_AI_CLIP_DIMS } from "../../config";
import { ELASTIC_AUTH } from "../../constants";
import logger from "../../utils/logger";

class ElasticSearchService {
  private client: Client;
  private index: string;
  private mapping: any;

  constructor() {
    this.client = new Client({
      node: ELASTIC_URL,
      auth: ELASTIC_AUTH,
      tls: { rejectUnauthorized: false },
    });
    this.index = ELASTIC_BUCKET;
    this.mapping = {
      properties: {
        video_id: { type: "keyword" },
        second: { type: "integer" },
        vectors: {
          type: "dense_vector",
          dims: CURRENT_AI_CLIP_DIMS,
        },
      },
    };
  }

  private async executeWithErrorLogging(operation: () => Promise<any>, errorMessage: string): Promise<any> {
    try {
      return await operation();
    } catch (error: any) {
      logger.error(`${errorMessage}: ${error.message}`);
      throw error;
    }
  }

  public checkIndexExists(): Promise<boolean> {
    return this.executeWithErrorLogging(
      () => this.client.indices.exists({ index: this.index }),
      "Error checking index existence"
    );
  }

  public createIndex(): Promise<void> {
    return this.executeWithErrorLogging(
      () => this.client.indices.create({ index: this.index, body: { mappings: this.mapping } }),
      "Error creating index"
    );
  }

  public indexDocument(id: string, body: any): Promise<void> {
    return this.executeWithErrorLogging(
      () => this.client.index({ index: this.index, id, body }),
      "Error indexing document"
    );
  }

  public searchByVector(vector: any, size: number = 10): Promise<any[]> {
    return this.executeWithErrorLogging(
      () => this.client.search({
        index: this.index,
        body: {
          query: {
            script_score: {
              query: { match_all: {} },
              script: {
                source: 'cosineSimilarity(params.query_vector, "vectors") + 1.0',
                params: { query_vector: vector },
              },
            },
          },
          size,
        },
      }).then(response => response.hits.hits),
      "Error searching by vector"
    );
  }
}

export default new ElasticSearchService();
