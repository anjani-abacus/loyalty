# loyalty_react_app

To generate index.android.bundle
react-native bundle \ --platform android \ --dev false \ --entry-file index.js \ --bundle-output android/app/src/main/assets/index.android.bundle \ --assets-dest android/app/src/main/res

# to generate splash images
npx react-native generate-bootsplash src/core/assets/images/logo2.png --background FFFFFF --logo-width 100   

# to run with development mode
npx react-native run-android --mode=developmentDebug

# to change app icon
go to production folder and update icons

# generate app icons from these sites:
https://www.appicon.co/
https://easyappicon.com/


<!-- "android:dev": "cp .env.development .env && react-native run-android",
    "android:prod": "cp .env.production .env && react-native run-android", -->

# DEV BUILD
# (release)                         # (debug)
./gradlew assembleDevRelease        ./gradlew assembleDevDebug


# PROD BUILD
# (release)                         # (debug)
./gradlew assembleProdRelease       ./gradlew assembleProdDebug


# BUNDLE TO DEPLOY THROUGH FASTLANE
# (release)                         # (Debug)
./gradlew bundleProdRelease         ./gradlew bundleProdDebug


# to update app version
build.gradle -> versionName, versionCode

# to get fastlane deployment commands, open fastfile.

# some cli commands for github
# updated files list
git status - 
git add .
git commit -m "first commit"

# to push
git push origin <ur branch name >

# To Merge:
# Make sure you are in main branch
git checkout main  

# Pull latest changes from remote main
git pull origin main  

# Merge your branch 'BRANCH_NAME' into main
git merge BRANCH_NAME  

# Push updated main branch to remote (GitHub)
git push origin main

# for creating branch or adding locally remote branch
git checkout -b BRANCH_NAME origin/BRANCH_NAME

# to log android errors
 adb logcat | grep -i "error\|exception\|crash" | head -20  

# to update splash logo

  1. android/app/src/main/res/drawable-hdpi/bootsplash_logo.png (72x72 dp)
  2. android/app/src/main/res/drawable-mdpi/bootsplash_logo.png (48x48 dp)
  3. android/app/src/main/res/drawable-xhdpi/bootsplash_logo.png (96x96 dp)
  4. android/app/src/main/res/drawable-xxhdpi/bootsplash_logo.png (144x144 dp)
  5. android/app/src/main/res/drawable-xxxhdpi/bootsplash_logo.png (192x192 dp)


<!-- CHANGES TO MAKE AFTER CLONING -->
# appDelegate.mm
self.moduleName

# index.js
AppRegistry.registerComponent(appName, () => App); // update appName

# app.json
update application name


# IOS CONFIGURATIONS:
# to generate app icons
1. generate app icons on "https://www.appicon.co/"
2. paste generated folder into your project "ios/projectname/Images.xcassets/AppIcon.appiconset"

# to generate bootsplash
1. generate bootsplash using package "react-native-bootsplash@6.3.10"
2. command: npx react-native generate-bootsplash assets/logo.png \ --background "#FFFFFF" \ --logo-width 120

# if not using bootsplash
https://apetools.webprofusion.com/#/tools/imagegorilla