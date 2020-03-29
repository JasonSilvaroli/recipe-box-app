import * as React from 'react';
import { useState, useEffect } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView, Picker, Image } from 'react-native';
import { Button, TextInput, Title, Subheading, Provider, Portal, Modal, Card, Snackbar, IconButton, FAB, Banner } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import RecipeCards from './RecipeCards';


const styles = StyleSheet.create({
  label: {
    color: '#000000',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // borderColor: '#000000',
    // borderWidth: 1,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 320
      },
    }),
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0,
    shadowRadius: 8.62,

    elevation: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',

    borderWidth: 0,
    height: 30,
    padding: 0,
    borderRadius: 4,
    marginBottom: 14
  },
  modalStyle: {
    zIndex: 1500,
    position: "absolute",
    flex: 3,
    justifyContent: 'center',
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',

    ...Platform.select({
      ios: {

        width: 330,
        height: 600
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        width: 330,
        height: 600
      },
    })
  }
});




function ShareRecipe({ props }) {
  
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    console.log(JSON.parse(props.state.params.props));
    const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
    
    const onChange = args => {
        return {
          value: args[0].nativeEvent.text,
        };
      };

    const onSubmit = async data => {

        // send email to user
        setError("sent", 'empty', "Email Sent!");
        setSending(true);
    }
  return (


    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Subheading>Enter the email you wish to share {RecipeCards.title} with: </Subheading>
        <Controller
            as={<TextInput disabled={loading} style={styles.input} />}
            name="email"

            control={control}
            onChange={onChange}
            rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
          />
           {errors.email && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Email.</Subheading>}
          <Button disabled={sending} loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
            Log in

            </Button>

            {errors.sent && <Subheading style={{ color: '#AED581', fontSize: 15, fontWeight: '600' }}>Email Sent!</Subheading>}
      </KeyboardAvoidingView>
    </View>

  );
}
export default ShareRecipe;
