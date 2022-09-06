import React, { Component } from 'react';
import { TextInput, Text, Button, Alert, View, StyleSheet } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'

export default class FormikForm extends Component {
  render() {
    const inputStyle = {
      borderWidth: 1,
      borderColor: '#4e4e4e',
      padding: 12,
      marginBottom: 5,
    };
    return (
      <Formik
        initialValues={{ 
          title: '',
          description: '', 
          authorName: '',
          imageURI: '', 
          tags: '',
        }}
        onSubmit={values => console.log(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .required()
            .min(2)
            .max(40),
          description: yup
            .string()
            .max(256),
          authorName: yup
            .string()
            .min(3)
            .max(40),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.title}
              style={inputStyle}
              onChangeText={handleChange('title')}
              onBlur={() => setFieldTouched('title')}
              placeholder="Title"
            />
            {touched.title && errors.title &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.title}</Text>
            }            
            <TextInput
              value={values.description}
              style={inputStyle}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              placeholder="Description"
            />
            {touched.description && errors.description &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.description}</Text>
            }
            <TextInput
              value={values.authorName}
              style={inputStyle}
              onChangeText={handleChange('authorName')}
              placeholder="Author"
              onBlur={() => setFieldTouched('authorName')}
              secureTextEntry={true}
            />
            {touched.authorName && errors.authorName &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.authorName}</Text>
            }
             <TextInput
              value={values.imageURI}
              style={inputStyle}
              onChangeText={handleChange('imageURI')}
              placeholder="Image URL"
              onBlur={() => setFieldTouched('imageURI')}
              secureTextEntry={true}
            />
            {touched.imageURI && errors.imageURI &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.imageURI}</Text>
            }
            <Button
              color="#3740FE"
              title='Submit'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 50 
  }
});