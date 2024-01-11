fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios build

```sh
[bundle exec] fastlane ios build
```

Build

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Push a new beta build to TestFlight

### ios codepush_production

```sh
[bundle exec] fastlane ios codepush_production
```

Push a new release hotfix update through Codepush

### ios codepush_staging

```sh
[bundle exec] fastlane ios codepush_staging
```

Push a new staging hotfix update through Codepush

### ios release

```sh
[bundle exec] fastlane ios release
```

Push a new release build to the App Store

### ios test_version_number

```sh
[bundle exec] fastlane ios test_version_number
```

test increment_version_number

### ios test_handle_semantic_version_number

```sh
[bundle exec] fastlane ios test_handle_semantic_version_number
```

test handle_semantic_version_number

### ios test_hotfix

```sh
[bundle exec] fastlane ios test_hotfix
```

test ios hotfix_version_update

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
