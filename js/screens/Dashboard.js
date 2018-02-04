import React, { Component } from 'react'
import ActionButton from 'react-native-action-button'
import { List, ListItem, Text, Container, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Debtor from '../components/Debtor'

class Dashboard extends Component{

    componentDidMount(){
        this.props.getDebtors()
    }

    render(){
        return(
            <Container>
                <List>
                    { this.props.debtors.map( (data, index) => <Debtor values={data} key={index}/>) }
                </List>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.props.navigation.dispatch({type: 'AddDebtor'})}}
                />
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        debtors: state.debtors
    }
}

export default connect(mapStateToProps, actions)(Dashboard)