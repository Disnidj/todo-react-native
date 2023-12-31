import {FunctionComponent, useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../config";
import { useNavigation } from '@react-navigation/native';

const  LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCreds => {
                const user = userCreds.user;
                console.log('ed with: ', user?.email);
                navigation.navigate("Home");
            })
            .catch(error => alert(error.message))

    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCrds => {
                const user = userCrds.user;
                console.log('LoggedIn with: ', user?.email);
                navigation.navigate("Home");
        
            })
            .catch(error => alert(error.message))
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
        >
             <Text style={{
        fontSize: 40,
        fontWeight: "600",
        textAlign: "center",
        color: "#0d1137",
        marginTop: "35%",
        marginBottom: "5%"
      }}>
        My To-Do App
      </Text>
            <View
                style={styles.inputContainer}
            >
                
                <TextInput
                    placeholder={'Type You Email Here...'}
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                ></TextInput>
                <TextInput
                    placeholder={'Enter the Password...'}
                    style={styles.input}
                    value={password}
                    onChangeText={pwd => setPassword(pwd)}
                    secureTextEntry
                ></TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbcbc9',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 20,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#e52165',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#000000',
        marginTop: 5,
        borderColor: '#000000',
        borderWidth: 1,
    },
    buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

