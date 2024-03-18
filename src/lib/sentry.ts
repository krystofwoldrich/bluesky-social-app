/**
 * Importing these separately from `platform/detection` and `lib/app-info` to
 * avoid future conflicts and/or circular deps
 */

import {Platform} from 'react-native'
import app from 'react-native-version-number'
import * as info from 'expo-updates'
import * as Sentry from '@sentry/react-native'

/**
 * Matches the build profile `channel` props in `eas.json`
 */
const buildChannel = (info.channel || 'development') as
  | 'development'
  | 'preview'
  | 'production'

/**
 * Examples:
 * - `dev`
 * - `1.57.0`
 */
const release = app.appVersion ?? 'dev'

/**
 * Examples:
 * - `web.dev`
 * - `ios.dev`
 * - `android.dev`
 * - `web.1.57.0`
 * - `ios.1.57.0.3`
 * - `android.1.57.0.46`
 */
const dist = `${Platform.OS}.${release}${
  app.buildVersion ? `.${app.buildVersion}` : ''
}`

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation(
  {
    enableTimeToInitialDisplay: true,
  },
)

Sentry.init({
  autoSessionTracking: false,
  dsn: 'https://852e8a6051ace8c1f033e2b57d2ec115@o1357066.ingest.us.sentry.io/4506921931243520',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  environment: buildChannel,
  dist,
  release,
  enableTracing: true,
  beforeSend(event) {
    // Modify the event here
    console.log('event', event.event_id)
    return event
  },
  integrations: [new Sentry.ReactNativeTracing({routingInstrumentation})],
})
