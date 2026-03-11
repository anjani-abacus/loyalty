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

Run unit tests

### android build_dev_debug

```sh
[bundle exec] fastlane android build_dev_debug
```

Build Dev Debug APK

### android build_dev_release

```sh
[bundle exec] fastlane android build_dev_release
```

Build Dev Release APK

### android build_prod_debug

```sh
[bundle exec] fastlane android build_prod_debug
```

Build Prod Debug APK

### android build_prod_release

```sh
[bundle exec] fastlane android build_prod_release
```

Build Prod Release APK

### android bundle_prod_release

```sh
[bundle exec] fastlane android bundle_prod_release
```

Build Prod Release AAB (Google Play)

### android bundle_prod_debug

```sh
[bundle exec] fastlane android bundle_prod_debug
```

Build Prod Debug AAB

### android deploy_prod

```sh
[bundle exec] fastlane android deploy_prod
```

Deploy Prod Release AAB to Google Play Production

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
