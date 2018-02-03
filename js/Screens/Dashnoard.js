import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ActionButton from 'react-native-action-button'

class Dashboard extends Component{
    render(){
        return(
            <View style={{flex: 1}}>
                <Text>Dashboard</Text>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                     onPress={() => { console.log("hi")}}
                />
            </View>
        )
    }
}

export default Dashboard