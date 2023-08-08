//
//  AppDelegateProxy.h
//  gabojait
//
//  Created by 최경민 on 2023/07/31.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

@interface AppDelegateProxy : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
