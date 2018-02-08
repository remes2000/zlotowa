import React, { Component } from 'react'
import { ListItem, Text, Left, Body, Right, Thumbnail } from 'native-base'
import UserAvatar from 'react-native-user-avatar'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Debtor extends Component{

    onPress = () => {
        this.props.setCurrentUser(this.props.debtor)
        this.props.navigation.dispatch({type: 'DebtorProfile'})
    }

    render(){

        const { Name, Surname, Debt, Currency, Color } = this.props.debtor

        return (
            <ListItem avatar onPress={this.onPress}>
                <Left>
                    <UserAvatar size="40" name={Name + " " + Surname} color={Color} />
                </Left>
                <Body>
                    <Text>{Name + " " + Surname}</Text>
                </Body>
                <Right>
                    <Text style={{color: 'red', fontSize: 20}}>{Debt + " " + Currency}</Text>
                </Right>
            </ListItem>
        )
    }
}

export default connect(null, actions)(Debtor)