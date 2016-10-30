import http from "http";

// Based on https://msdn.microsoft.com/en-us/library/azure/dn707638.aspx

export default class NamingService {
    constructor() {
        this.host = process.env.Fabric_NodeIPOrFQDN || "192.168.50.50";
        this.version = 1.0;
    }

    resolveEndpoint(application, service, endpoint) {
        let self = this;
        let promise = new Promise((resolve, reject) => {
            let options = {
                hostname: self.host,
                port: 19080,
                path: `/Applications/${application}/$/GetServices/${service}/$/ResolvePartition?api-version=${self.version}`,
                method: "GET"
            };

            console.log(`Get Service endpoints : ${options.path}`);


            let request = http.request(options, response => {
                response.on("data", data => {
                    let service = JSON.parse(data.toString("utf8"));
                    if( typeof service.Endpoints == "undefined" ) {
                        reject();
                        return;
                    }

                    let found = false;
                    service.Endpoints.forEach(endpointDefinition => {
                        let endpoints = JSON.parse(endpointDefinition.Address).Endpoints;

                        if( endpoints.hasOwnProperty(endpoint) ) {

                            let resolvedEndpoint = endpoints[endpoint];

                            if( resolvedEndpoint.indexOf("localhost") >= 0 ) resolvedEndpoint = resolvedEndpoint.replace("localhost", self.host);

                            resolve(resolvedEndpoint);
                            found = true;
                        }
                    });

                    if( !found ) reject();
                });

            });

            request.on("error", error => {
                console.log(error);
            });

            request.end();

        });

        return promise;
    }
}
export let namingService = new NamingService();