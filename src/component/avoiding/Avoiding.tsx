import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';

interface Props {
  children: React.ReactNode
}

export const Avoiding = (props: Props) => {
  const { children } = props;

  if (Platform.OS === 'android') {
    return (
      <>
        {children}
        <KeyboardAvoidingView behavior="position" />
      </>
    )
  }

  return (
    <KeyboardAvoidingView behavior="position">
      {children}
    </KeyboardAvoidingView>
  )
}
