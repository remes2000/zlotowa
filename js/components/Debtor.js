import React from 'react'
import { ListItem, Text, Left, Body, Right, Thumbnail } from 'native-base'
import UserAvatar from 'react-native-user-avatar'

export default props => {

    const { Name, Surname, Debt, Currency} = props.values
    const color = 'red'

    return (
        <ListItem avatar>
            <Left>
                <UserAvatar size="40" name={Name + " " + Surname} color={ color } />
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