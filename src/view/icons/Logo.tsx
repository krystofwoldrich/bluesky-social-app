import React from 'react'
import {StyleSheet, TextProps} from 'react-native'
import Svg, {
  Defs,
  LinearGradient,
  Path,
  PathProps,
  Stop,
  SvgProps,
  SvgUri,
} from 'react-native-svg'
import {Image} from 'expo-image'

import {colors} from '#/lib/styles'
import {useKawaiiMode} from '#/state/preferences/kawaii'

const ratio = 57 / 64

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = React.forwardRef(function LogoImpl(props: Props, ref) {
  const {fill, ...rest} = props
  const gradient = fill === 'sky'
  const styles = StyleSheet.flatten(props.style)
  const _fill = gradient ? 'url(#sky)' : fill || styles?.color || colors.blue3
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  const isKawaii = useKawaiiMode()

  if (isKawaii) {
    return (
      <Image
        source={
          size > 100
            ? require('../../../assets/kawaii.png')
            : require('../../../assets/kawaii_smol.png')
        }
        accessibilityLabel="Bluesky"
        accessibilityHint=""
        accessibilityIgnoresInvertColors
        style={[{height: size, aspectRatio: 1.4}]}
      />
    )
  }

  return (
    <SvgUri
      onError={() =>
        console.error('Failed to load logo')
      }
      width="30"
      height="30"
      uri={"https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg"}
    />
  )
})
