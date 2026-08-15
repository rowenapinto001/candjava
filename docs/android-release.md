# Android Release Guide

## Version

- Application ID: `com.codenotes.lab`
- Version name: `1.0.0`
- Version code: `1`

Increase `versionCode` for every Play Store upload and update `versionName` for user-facing releases.

## Development build

```bash
npm run android:debug
```

The debug APK is created at `android/app/build/outputs/apk/debug/app-debug.apk`.

## Create a private upload key once

Run this outside the repository and keep the keystore and passwords backed up securely:

```bash
keytool -genkeypair -v \
  -keystore "$HOME/code-notes-lab-upload.jks" \
  -alias code-notes-upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Never commit the `.jks` file or passwords.

## Build a signed app bundle

The Gradle release configuration reads signing values from environment variables:

```bash
export CODE_NOTES_KEYSTORE="$HOME/code-notes-lab-upload.jks"
export CODE_NOTES_STORE_PASSWORD="your-keystore-password"
export CODE_NOTES_KEY_ALIAS="code-notes-upload"
export CODE_NOTES_KEY_PASSWORD="your-key-password"
npm run android:bundle
```

The signed AAB is created at `android/app/build/outputs/bundle/release/app-release.aab`.

To build a signed release APK with the same environment variables:

```bash
npm run android:sync
cd android
./gradlew assembleRelease
```

The APK is created at `android/app/build/outputs/apk/release/app-release.apk`.

## Before publishing

1. Test the release build on at least one physical Android device.
2. Add a real support email and host the privacy policy at a public HTTPS URL.
3. Capture current phone screenshots and create the 1024 x 500 feature graphic.
4. Complete Google Play's content-rating and Data safety forms using `docs/play-store-listing.md`.
5. Enable Play App Signing and upload the signed AAB to an internal testing track first.
