/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpFetchError, HttpFetchQuery, HttpSetup } from "opensearch-dashboards/public";
import { GetPoliciesResponse, PutPolicyResponse } from "../../server/models/interfaces";
import { ServerResponse } from "../../server/models/types";
import { NODE_API } from "../../utils/constants";
import { DocumentPolicy, Policy } from "../../models/interfaces";
import { MDSEnabledClientService } from "./MDSEnabledClientService";

export default class PolicyService extends MDSEnabledClientService {
  getPolicies = async (queryObject: HttpFetchQuery | undefined): Promise<ServerResponse<GetPoliciesResponse>> => {
    let url = `..${NODE_API.POLICIES}`;
    queryObject = this.patchQueryObjectWithDataSourceId(queryObject);
    const response = (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<GetPoliciesResponse>;
    return response;
  };

  putPolicy = async (
    policy: { policy: Policy },
    policyId: string,
    seqNo?: number,
    primaryTerm?: number
  ): Promise<ServerResponse<PutPolicyResponse>> => {
    let url = `..${NODE_API.POLICIES}/${policyId}`;
    let queryObject: HttpFetchQuery | undefined = { seqNo, primaryTerm };
    queryObject = this.patchQueryObjectWithDataSourceId(queryObject);
    console.log("PolicyService putPolicy queryObject: ", queryObject);
    const response = (await this.httpClient.put(url, { query: queryObject, body: JSON.stringify(policy) })) as ServerResponse<
      PutPolicyResponse
    >;
    return response;
  };

  getPolicy = async (policyId: string): Promise<ServerResponse<DocumentPolicy>> => {
    const url = `..${NODE_API.POLICIES}/${policyId}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    const response = (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<DocumentPolicy>;
    return response;
  };

  deletePolicy = async (policyId: string): Promise<ServerResponse<boolean>> => {
    const url = `..${NODE_API.POLICIES}/${policyId}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    const response = (await this.httpClient.delete(url, { query: queryObject })) as ServerResponse<boolean>;
    return response;
  };
}
