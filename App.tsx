import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik';

import ReactCheckBox from 'react-native-bouncy-checkbox';



const App = () => {
  const PasswordSchema = Yup.object().shape({
    PasswordLength: Yup.number()
                  .min(4,'The minimum size should be 4')
                  .max(20,'The maximum size should be 20')
                  .required('The size is required ')
  })

  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [upperCase,setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const[numbers,setNumbers] = useState(false);
  const [symbols,setSymbols] = useState(false);

  const generatePasswordString =(PasswordLength: number)=>{

        let passwordList = '';

        const Upper = 'ABDEFGHIJKLMNOPQRSTUVWXYZ';
        const Lower = 'abcdefghijklmnopqrstuvwxyz';
        const number = '123457890';
        const symbol = '!@#$%^&*+_~';

        if(upperCase){
          passwordList += Upper;
        }
        if(lowerCase){
          passwordList += Lower;
        }
        if(numbers){
          passwordList += number; 
        }
        if(symbols){
          passwordList += symbol;
        }


       const passwordResult =  createPassword(passwordList,PasswordLength);
       setPassword(passwordResult);
       setIsPasswordGenerated(true);


  }

  const createPassword = (characters: string , PasswordLength: number)=>{
          let pass= '';
          for (let index = 0; index<PasswordLength; index++) {
               let valindex = Math.round(Math.random() * characters.length);
               pass += characters.charAt(valindex);   
            
          }
          return pass;
  }

  const resetPasswordState = ()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setUpperCase(false);
    setLowerCase(true);
    setSymbols(false);
    setNumbers(false);

  }

  
  return (
    <ScrollView keyboardShouldPersistTaps="handled" >
            <SafeAreaView style={styles.appContainer}>

                <View style={styles.formContainer}>
                <Text style={styles.title }> Password Generator </Text>

                <Formik
            initialValues={{ PasswordLength: '' }}
           validationSchema={PasswordSchema}
            onSubmit={values =>{
              console.log(values)
               generatePasswordString(+values.PasswordLength); // converting string into number type
            }}
            
           >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleReset,
              handleSubmit,
              
              /* and other goodies */
            }) => (



              <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}> Password Length </Text>
                  {
                      (touched.PasswordLength && errors.PasswordLength && (
                        <Text style={styles.errorText}>
                          {errors.PasswordLength}
                        </Text>
                      ))
                  }
                  
                </View>
                <TextInput
                    style={styles.inputStyle}
                    value={values.PasswordLength}
                    onChangeText={handleChange("PasswordLength")}
                    keyboardType='numeric'
                    placeholder='Ex. 8'
                  />
              </View>



              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include LowerCase </Text>
                <ReactCheckBox
                disableBuiltInState
                isChecked={lowerCase}
                onPress={()=>setLowerCase(!lowerCase)}
                fillColor='#29AB87'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include UpperCase </Text>
                <ReactCheckBox
                disableBuiltInState
                isChecked={upperCase}
                onPress={()=>setUpperCase(!upperCase)}
                fillColor='#29AB87'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Number </Text>
                <ReactCheckBox
                disableBuiltInState
                isChecked={numbers}
                onPress={()=>setNumbers(!numbers)}
                fillColor='#29AB87'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Symbols </Text>
                <ReactCheckBox
                disableBuiltInState
                isChecked={symbols}
                onPress={()=>setSymbols(!symbols)}
                fillColor='#29AB87'
                />
              </View>

              

              <View style={styles.formActions}>
                <TouchableOpacity
                disabled={!isValid}
                style={styles.primaryBtn}
                onPress={()=>{
                  handleSubmit();
                }}
                > 
                <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>

                <TouchableOpacity

                style={styles.secondaryBtn}
                onPress={()=>{
                  handleReset();
                  resetPasswordState();
                  
                }}
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>

              </View>



              </>
                
            )}
           </Formik>
           </View>
            
            
            
            
            
            <View>
              {
                isPasswordGenerated?(
                  <View style={[styles.card, styles.cardElevated]}>
                    <Text style={styles.subTitle}>
                                Result: </Text>
                    <Text style={styles.description}>Long Press To Copy </Text>
                    <Text selectable={true} style={styles.generatedPassword}>{password} </Text>
                  </View>
                ):null
              }
            </View>
                

            </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})