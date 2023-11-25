declare module '@env' {
  // Define a generic type using template literal types
  export type DeploymentKey<T extends string> = `CODEPUSH_DEPLOYMENT_KEY_RELEASE_${T}`;

  export const CODEPUSH_DEPLOYMENT_KEY_RELEASE_ANDROID: DeploymentKey<'ANDROID'>;
  export const CODEPUSH_DEPLOYMENT_KEY_STAGING_ANDROID: DeploymentKey<'ANDROID'>;
  export const CODEPUSH_DEPLOYMENT_KEY_RELEASE_IOS: DeploymentKey<'IOS'>;
  export const CODEPUSH_DEPLOYMENT_KEY_STAGING_IOS: DeploymentKey<'IOS'>;
}
