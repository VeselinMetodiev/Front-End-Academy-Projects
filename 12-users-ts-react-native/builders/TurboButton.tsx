import { IconType } from '@rneui/themed/dist/Icon';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Text, View, StyleSheet, Pressable, TextStyle, OpaqueColorValue, PressableProps, PressableStateCallbackType } from 'react-native';

interface IButtonProps {
  textSize?: number;
  style?: TextStyle;
  children?: ReactNode; // Needed for forward ref
  backgroundColor?: string | OpaqueColorValue | undefined;
  color?: string | OpaqueColorValue | undefined;
  text?: string | undefined;
  buttonSize?: number
  textStyle ?: TextStyle;
  ref?: ForwardedRef<any>;
  name: IconType;

}

type IButtonPropsType = PressableProps & IButtonProps;

const TurboButton = React.forwardRef<any, Partial<IButtonPropsType>>((props, fRef) => {
  const {style, text, textSize, buttonSize, children, backgroundColor, color, ...other } = props;
  return (
    <Pressable style={[ {  marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',backgroundColor: backgroundColor, padding: buttonSize!/10, width: buttonSize, height: buttonSize, borderRadius: buttonSize }]} {...props} ref={fRef}>
      <Text style={[style, { fontSize: textSize, color: color}]}>{text}{children}</Text>
    </Pressable>
);
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  roundButton2: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
});

export default TurboButton;