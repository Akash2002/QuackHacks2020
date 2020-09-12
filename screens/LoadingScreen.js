import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import * as firebase from 'firebase'
import {colors} from "../Styles"

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            //TODO: redirect to BankStack if this user is a food bank account

            if(user && user.emailVerified){
                this.props.navigation.navigate("Bank");
            } else if(user && user.emailVerified) {
                isFoodBank(user); // gets the data if user is foodbank or not
                this.props.navigation.navigate("Indiv");
            } else {
                this.props.navigation.navigate("Auth");
            }
        });
    }
    

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(247, 247, 247, 1)"
    }
})

let isFoodBank = function (user) {
    firebase.firestore().collection("users").doc(user.email).get().then(function(doc) {
        console.log(doc.data().toString());
        if (doc.exists) {
            return doc.data().isFoodBank;
        } else {
            return null;
        }
    })
}