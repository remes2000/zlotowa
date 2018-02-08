import React, { Component } from 'react'
import { Container, Form, Item, Input, Button, Text, Content, Picker } from 'native-base'
import { StyleSheet, BackHandler } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '../actions'

class AddDebtor extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            surname: '',
            debt: '',
            currency: 'PLN',
            errors: {}
        }
    }

    colorVariables = [
        "#3F51B5",
        "#62B1F6",
        "#d9534f",
        "#f0ad4e",
        "#000",
        "#f4f4f4"
    ]

    onNameFieldChange = value => {
        this.setState({
            name: value
        })
    }

    onSurnameFieldChange = value => {
        this.setState({
            surname: value
        })
    }

    onDebtFieldChange = value => {
        this.setState({
            debt: value
        })
    }

    onPickerOptionChange = value => {
        this.setState({
            currency: value
        })
    }

    addUser = () => {
        const errors = this.validateForm()
        console.log(errors)
        if(_.isEmpty(errors)){
            this.props.addDebtor(this.state, _.sample(this.colorVariables))
        }
        else
            this.setState({ errors })
    }

    validateForm = () => {
        let errors = {}
        if(!this.state.name) errors.name = 'Uzupełnij to pole!'
        if(!this.state.surname) errors.surname = 'Uzupełnij to pole!'
        if(isNaN(parseFloat(this.state.debt))) errors.debt = 'Tylko liczby!'        
        if(!this.state.debt) errors.debt = 'Uzupełnij to pole!'
        return errors
    }

    render(){
        return(
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <Form style={styles.form}>
                        <Item error={!!this.state.errors.name}>
                            <Input placeholder="Imię" name="name" value={this.state.name} onChangeText={this.onNameFieldChange}/>
                            { this.state.errors.name && <Text style={styles.errorMsg}>{this.state.errors.name}</Text>}
                        </Item>
                        <Item error={!!this.state.errors.surname}>
                            <Input placeholder="Nazwisko" name="surname" value={this.state.surname} onChangeText={this.onSurnameFieldChange}/>
                            { this.state.errors.surname && <Text style={styles.errorMsg}>{this.state.errors.surname}</Text>}                            
                        </Item>
                        <Item error={!!this.state.errors.debt}>
                            <Input 
                                placeholder="Dług" 
                                keyboardType='numeric'
                                value={this.state.debt}
                                onChangeText={this.onDebtFieldChange} 
                            />
                            { this.state.errors.debt && <Text style={styles.errorMsg}>{this.state.errors.debt}</Text>}                            
                        </Item>
                        <Picker                   
                            iosHeader="Select one"
                            mode='dialog'
                            selectedValue={this.state.currency}
                            onValueChange={this.onPickerOptionChange}>
                                <Picker.Item label="PLN" value="PLN" />
                                <Picker.Item label="USD" value="USD" />
                                <Picker.Item label="EUR" value="EUR" />
                                <Picker.Item label="GBP" value="GBP" />
                        </Picker>
                        <Button block success style={{marginTop: 15}} onPress={ () => this.addUser() }><Text> Dodaj </Text></Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'  
    },
    form: {
        width: '80%',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMsg: {
        color: 'red'
    }
})

export default connect(null, actions)(AddDebtor)