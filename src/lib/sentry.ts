/**
 * Importing these separately from `platform/detection` and `lib/app-info` to
 * avoid future conflicts and/or circular deps
 */

import {Platform} from 'react-native'
import {nativeApplicationVersion, nativeBuildVersion} from 'expo-application'
import {init, ReactNavigationInstrumentation, ReactNativeTracing} from '@sentry/react-native';

import {BUILD_ENV, IS_DEV, IS_TESTFLIGHT} from 'lib/app-info'

/**
 * Examples:
 * - `dev`
 * - `1.57.0`
 */
const release = nativeApplicationVersion ?? 'dev'

/**
 * Examples:
 * - `web.dev`
 * - `ios.dev`
 * - `android.dev`
 * - `web.1.57.0`
 * - `ios.1.57.0.3`
 * - `android.1.57.0.46`
 */
const dist = `${Platform.OS}.${nativeBuildVersion}.${
  IS_TESTFLIGHT ? 'tf' : ''
}${IS_DEV ? 'dev' : ''}`

export const routingInstrumentation = new ReactNavigationInstrumentation({
  enableTimeToInitialDisplay: true,
});

init({
  dsn: 'https://1df17bd4e543fdb31351dee1768bb679@o447951.ingest.sentry.io/5428561',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  environment: BUILD_ENV ?? 'development',
  dist,
  release,
  enableTracing: true,
  integrations: [
    new ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  _experiments: {
    replaysSessionSampleRate: 1,
    replaysOnErrorSampleRate: 1,
  }
})
