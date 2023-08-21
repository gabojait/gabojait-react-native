#import "AppDelegate.h"

// Firebase
#import <Firebase.h>
#import "RNFBMessagingModule.h"

#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"  // here


// CodePush
#import <CodePush/CodePush.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Firebase
  [FIRApp configure];

  self.moduleName = @"gabojait";

  // 백그라운드에서 알림을 수신한 경우에 iOS는 앱을 백그라운드에서 실행하게 합니다.
  // 이때, initialProps의 isHeadless를 true로 줘서 JS 코드 단에서 백그라운드임을 알려주고, 앱의 라이프사이클이 시작되지 않도록 합니다.
  self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];

  // 슈퍼 클래스의 `didFinishLaunchingWithOptions` 를 호출합니다.
  [super application:application didFinishLaunchingWithOptions:launchOptions];

  // SplashScreen을 표시합니다.
  [RNSplashScreen show];  // here

  return YES;
}

// 브릿지를 위한 JS 번들 로드
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // 개발 빌드가 아닐 경우 CodePush의 bundle을 이용한다.
    return [CodePush bundleURL];
#endif
}

@end
