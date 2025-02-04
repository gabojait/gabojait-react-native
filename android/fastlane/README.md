fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Runs all the tests

### android codepush_to_release

```sh
[bundle exec] fastlane android codepush_to_release
```

Codepush to android production track

### android codepush_to_staging

```sh
[bundle exec] fastlane android codepush_to_staging
```

Codepush to android staging track 

### android build

```sh
[bundle exec] fastlane android build
```

Build

### android deploy_internal

```sh
[bundle exec] fastlane android deploy_internal
```

구글 플레이 내부 업데이트(Submit a new version to the internal track in the Google Play)

### android deploy

```sh
[bundle exec] fastlane android deploy
```

구글 플레이 출시(Deploy a new version to the Google Play)

### android test_update_android_version

```sh
[bundle exec] fastlane android test_update_android_version
```

android native 버전 증가 테스트

### android test_hotfix

```sh
[bundle exec] fastlane android test_hotfix
```

gabojait-react-native/package.json의 android-hotfixVersion을 증가시키는 테스트

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
