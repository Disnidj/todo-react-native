 

import { View, Text, FlatList, StyleSheet, Pressable, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase ,auth} from '../config';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';




const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    // fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot( 
            querySnapshot => {
            const todos = []
            querySnapshot.forEach((doc) => {
                const {heading} = doc.data()
                todos.push({
                    id: doc.id,
                    heading,
                })
            })
            setTodos(todos)
            //console.log(users)
        })
    }, [])

//logout function 
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("LoginScreen")
            })
            .catch(error => alert(error.message))
    }



    // delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert("Deleted successfully !");
            })
            .catch(error => {
                // show an error alert
                alert(error);
            })
    }

    // add a todo
    const addTodo = () => {
        // check if we have a todo.
        if (addData && addData.length > 0) {
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    // release todo state
                    setAddData('');
                    // release keyboard
              
                    Keyboard.dismiss();
                    alert("New To-do Added Successfully ");
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    return (
        <View style={{flex:1, backgroundColor:'#fbcbc9'}}>
                 <TouchableOpacity
                onPress={handleSignOut}
                style={styles.buttonSignOut}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
      
       <Text style={{
        fontSize: 40,
        fontWeight: "600",
        textAlign: "center",
        color: "#000000",
        marginTop: "35%",
        marginBottom: "5%"
      }}>
        My To-Do
      </Text>
 
            <View style={styles.formContainer}>
   
       
            

                <TextInput
                    style={styles.input}
                    placeholder='Add a To-Do'
                    fontSize='20'
                    placeholderTextColor="#000000"
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{}}
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                        style={styles.container}
                        onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome name="trash-o" 
                            color="#0d1137" 
                            onPress={() => deleteTodo(item)} 
                            style={styles.todoIcon} />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                            </View> 
                            
                        </Pressable>
                    </View>
                    

                )}
            />
     
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e52165',
        padding: 15,
        borderRadius: 15,
        margin:5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft:45,
        
        
    },
    
    itemHeading: {
        fontWeight: 'bold',
        fontSize:18,
        marginRight:22,
        color:'#ffffff',
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight: 10,
        marginTop:100,
        
       
        
    },
    buttonSignOut: {
        backgroundColor: '#0d1137',
        width: '100%',
        padding: 10,
        borderRadius: 0,
        marginTop: 100,
        marginBottom:-90,
        alignItems:"center",
    },

    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#000000',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },

    todoIcon:{
        marginTop:10,
        fontSize:25,
        fontWeight: 'bold',
        marginLeft:14,
    },

});

export default Home