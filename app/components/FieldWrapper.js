import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const FieldWrapper = ({ children, formikProps, formikKey }) => (
  <View style={{ marginBottom: 10 }}>
    {children}
    <Text
      style={
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? styles.errors
          : styles.normal
      }
    >
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  normal: {
    height: 0,
    paddingLeft: 16,
  },
  errors: {
    color: theme.color.red,
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    paddingVertical: 4,
    paddingLeft: 16,
  },
});

export default FieldWrapper;
