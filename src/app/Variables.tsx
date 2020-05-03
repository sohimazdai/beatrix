const prodUrl = "3d0dc492-bd67-4182-9871-7cfbdbe16ad5.pub.cloud.scaleway.com";

const ENV = {
  dev: {
    name: 'dev',
    apiUrl: "localhost:3001",
    amplitudeApiKey: 'dde4db10f8b93d2909a30ddced3a44a8',
  },
  prod: {
    name: 'prod',
    apiUrl: prodUrl,
    amplitudeApiKey: '20820088c225ef74299a29a60a2afe34',
  }
};

function getEnvVars() {
  if (__DEV__)return ENV.dev;
  
  return ENV.prod;
}

export function isDev() {
  return getEnvVars().name === 'dev';
}

export default getEnvVars();
