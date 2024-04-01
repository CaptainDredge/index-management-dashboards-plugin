import { HttpFetchQuery, HttpSetup } from "opensearch-dashboards/public";

export abstract class MDSEnabledClientService {
  httpClient: HttpSetup;
  dataSourceId: string;
  mdsEnabled: boolean;

  constructor(httpClient: HttpSetup, dataSourceId: string = "", mdsEnabled: boolean = false) {
    this.httpClient = httpClient;
    this.dataSourceId = dataSourceId;
    this.mdsEnabled = mdsEnabled;
  }

  patchQueryObjectWithDataSourceId(queryObject?: HttpFetchQuery): HttpFetchQuery | undefined {
    queryObject = queryObject || {};
    if (this.mdsEnabled) {
      queryObject.dataSourceId = this.dataSourceId;
    }
    return queryObject;
  }
}
