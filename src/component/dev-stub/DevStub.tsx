import React from 'react';
import { Text, View } from 'react-native';

export function DevStub() {
  return <View style={{ position: 'absolute'}}>
    <Text style={{ color: 'red', fontWeight: "bold" }}>
      DEVELOPMENT MODE
    </Text>
  </View>
}
