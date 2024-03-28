import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "underscore-fe",
      region: process.env.AWS_REGION,
    };
  },
  stacks(app) {
    if (!["dev", "prod"].includes(app.stage)) {
      throw new Error("Invalid stage");
    }

    app.stack(function Site({ stack }) {
      const site = new NextjsSite(
        stack,
        "site",
        stack.stage === "prod"
          ? {
              customDomain: {
                domainName: `${process.env.AWS_PUBLIC_DOMAIN}`,
                hostedZone: `${process.env.AWS_PUBLIC_DOMAIN}`,
              },
            }
          : {}
      );

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
