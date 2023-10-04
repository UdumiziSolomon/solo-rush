import { Text, Pressable, View, Dimensions } from 'react-native'
import React, { ComponentProps, ReactNode } from 'react'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { SvgProps } from 'react-native-svg';

const { width, height } = Dimensions.get("window");

type ButtonProps = {
  onPress?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonSvg?: SvgProps;
} & ComponentProps<typeof View>

export const Button = ({ onPress, buttonText }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  )
}

const styles = ScaledSheet.create({
  buttonWrapper: {
    paddingVertical: ms(17),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: ms(20),
    marginVertical: ms(20),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ccd3e3',
    width: width - 40,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Sofia',
    fontSize: ms(16),
    color: '#38486d',
  }
});