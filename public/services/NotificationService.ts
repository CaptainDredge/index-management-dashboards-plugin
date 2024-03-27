/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpSetup } from "opensearch-dashboards/public";
import { GetChannelsResponse, GetNotificationConfigsResponse } from "../../server/models/interfaces";
import { ServerResponse } from "../../server/models/types";
import { NODE_API } from "../../utils/constants";
import { MDSEnabledClientService } from "./MDSEnabledClientService";

export default class NotificationService extends MDSEnabledClientService {
  getChannels = async (): Promise<ServerResponse<GetChannelsResponse>> => {
    let url = `..${NODE_API.CHANNELS}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    const response = (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<GetChannelsResponse>;
    return response;
  };

  getChannel = async (channelId: string): Promise<ServerResponse<GetNotificationConfigsResponse>> => {
    let url = `..${NODE_API.CHANNELS}/${channelId}`;
    const queryObject = this.patchQueryObjectWithDataSourceId();
    const response = (await this.httpClient.get(url, { query: queryObject })) as ServerResponse<GetNotificationConfigsResponse>;
    return response;
  };
}
