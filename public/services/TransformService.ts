/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpFetchQuery, HttpSetup } from "opensearch-dashboards/public";
import { ServerResponse } from "../../server/models/types";
import { GetFieldsResponse, GetTransformsResponse, PreviewTransformResponse, PutTransformResponse } from "../../server/models/interfaces";
import { NODE_API } from "../../utils/constants";
import { DocumentTransform, Transform } from "../../models/interfaces";
import { MDSEnabledClientService } from "./MDSEnabledClientService";

export default class TransformService extends MDSEnabledClientService {
  getTransforms = async (queryObject?: HttpFetchQuery): Promise<ServerResponse<GetTransformsResponse>> => {
    const url = `..${NODE_API.TRANSFORMS}`;
    queryObject = this.patchQueryObjectWithDataSourceId(queryObject);
    // @ts-ignore
    return (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<GetTransformsResponse>;
  };

  putTransform = async (
    transform: Transform,
    transformId: string,
    seqNo?: number,
    primaryTerm?: number
  ): Promise<ServerResponse<PutTransformResponse>> => {
    const url = `..${NODE_API.TRANSFORMS}/${transformId}`;
    let queryObject = this.patchQueryObjectWithDataSourceId({ seqNo, primaryTerm });
    return (await this.httpClient.put(url, { query: queryObject, body: JSON.stringify(transform) })) as ServerResponse<
      PutTransformResponse
    >;
  };

  getTransform = async (transformId: string): Promise<ServerResponse<DocumentTransform>> => {
    const url = `..${NODE_API.TRANSFORMS}/${transformId}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    return (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<DocumentTransform>;
  };

  deleteTransform = async (transformId: string): Promise<ServerResponse<boolean>> => {
    const url = `..${NODE_API.TRANSFORMS}/${transformId}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    return (await this.httpClient.delete(url, { query: queryObject })) as ServerResponse<boolean>;
  };

  startTransform = async (transformId: string): Promise<ServerResponse<boolean>> => {
    const url = `..${NODE_API.TRANSFORMS}/${transformId}/_start`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    return (await this.httpClient.post(url, { query: queryObject })) as ServerResponse<boolean>;
  };

  stopTransform = async (transformId: string): Promise<ServerResponse<boolean>> => {
    const url = `..${NODE_API.TRANSFORMS}/${transformId}/_stop`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    return (await this.httpClient.post(url, { query: queryObject })) as ServerResponse<boolean>;
  };

  previewTransform = async (transform: any): Promise<ServerResponse<PreviewTransformResponse>> => {
    const url = `..${NODE_API.TRANSFORMS}/_preview`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    // @ts-ignore
    return (await this.httpClient.post(url, { body: JSON.stringify(transform), query: queryObject })) as ServerResponse<
      PreviewTransformResponse
    >;
  };

  //Function to search for fields from a source index using GET /${source_index}/_mapping
  searchSampleData = async (index: string, body: string, queryObject?: HttpFetchQuery): Promise<ServerResponse<any>> => {
    const url = `..${NODE_API._SEARCH_SAMPLE_DATA}/${index}`;
    queryObject = this.patchQueryObjectWithDataSourceId(queryObject);
    const response = (await this.httpClient.post(url, { query: queryObject, body: body })) as ServerResponse<any>;
    return response;
  };
}
