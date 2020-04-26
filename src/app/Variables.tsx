import Constants from 'expo-constants';

export const prodUrl = "3d0dc492-bd67-4182-9871-7cfbdbe16ad5.priv.cloud.scaleway.com";

const ENV = {
  dev: {
    name: 'dev',
    apiUrl: "localhost:3001",
    amplitudeApiKey: 'dde4db10f8b93d2909a30ddced3a44a8',
  },
  staging: {
    name: 'staging',
    apiUrl: prodUrl,
    amplitudeApiKey: '20820088c225ef74299a29a60a2afe34',
  },
  prod: {
    name: 'prod',
    apiUrl: prodUrl,
    amplitudeApiKey: '20820088c225ef74299a29a60a2afe34',
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
