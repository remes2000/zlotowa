import React, { Component } from 'react'
import ActionButton from 'react-native-action-button'
import { Container, Content, Text, View, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Prompt from 'rn-prompt'
import { connect } from 'react-redux'
import * as actions from '../actions'
import DialogButton from 'react-native-popup-dialog/dist/components/DialogButton';

class DebtorProfile extends Component{

    constructor(props){
        super(props)

        this.state = {
            promptVisible: false,
            promptType: '',
            promptValue: '',
            alertText: '',
            alertOkFunction: null
        }
    }

    increaseDebt = () => {
        this.setState({
            promptVisible: true,
            promptType: 'increaseDebt'
        })
    }

    decreaseDebt = () => {
        this.setState({
            promptVisible: true,
            promptType: 'decreaseDebt'
        })
    }

    onPromptSubmit = () => {

        switch(this.state.promptType){
            case 'increaseDebt':
                this.props.setDebtTo(this.props.currentUser.Id, this.props.currentUser.Debt + parseFloat(this.state.promptValue))
            break
            case 'decreaseDebt':
                const value = this.props.currentUser.Debt - parseFloat(this.state.promptValue)
                if(value < 0)
                    this.showAlert("Wprowadzona kwota jest wyższa niż aktualny dług. Wciśnięcie przycisku enter spowoduje wyzerowanie długu.", () => this.props.setDebtTo(this.props.currentUser.Id, 0))
                else
                    this.props.setDebtTo(this.props.currentUser.Id, value)
            break
        }

        this.setState({promptVisible: false})
    }

    onPromptTextChange = value => {
        if( !isNaN(value) || value === '')
            this.setState({promptValue: value})
    }

    showAlert = (message, ok) => {
        this.setState({
            alertText: message,
            alertOkFunction: ok
        }, () => this.popupDialog.show())
    }

    render(){

        const { Name, Surname, Debt, Currency, Color, Id } = this.props.currentUser

        return(
            <Container>
                <Content>
                    <View style={styles.UserInfoContainer}>
                        <UserAvatar size="115" name={Name + " " + Surname} color={Color} />
                        <Text style={styles.UserName}>{Name + " " + Surname}</Text>
                        <Text style={styles.UserDebt}>{Debt + " " + Currency}</Text>
                    </View>
                    <View style={styles.ActionsMenu}>
                        <View style={styles.ActionsContainer}>
                            <Button block success style={styles.ActionButton} onPress={() => this.decreaseDebt()}><Text>Zmniejsz dług</Text></Button>
                            <Button block warning style={styles.ActionButton} onPress={() => this.increaseDebt()}><Text>Zwiększ dług</Text></Button>
                            <Button block primary style={styles.ActionButton} onPress={() => this.showAlert("Czy napewno chcesz wyzerować cały dług?", () => this.props.setDebtTo(Id, 0)) }><Text>Wyzeruj cały dług</Text></Button>                        
                            <Button block danger style={styles.ActionButton} onPress={() => this.showAlert("Czy napewno chcesz usunąć dłużnika?", () => this.props.deleteDebtor(Id)) }><Text>Usuń dłużnika</Text></Button>
                        </View>
                    </View>
                </Content>
                <Prompt
                    title={this.state.promptType === 'increaseDebt'? 'Zwiększ dług' : 'Zmniejsz dług'}
                    placeholder={`Wprowadź kwotę (${Currency}) `}
                    visible={ this.state.promptVisible }
                    onChangeText = { this.onPromptTextChange }
                    textInputProps = {{
                        value: this.state.promptValue
                    }}
                    onCancel={ () => this.setState({
                        promptVisible: false
                    }) }
                    onSubmit={this.onPromptSubmit}/>
                <PopupDialog
                    ref={ popupDialog => { this.popupDialog = popupDialog}}
                    dialogTitle={<Text style={{ fontSize: 30 }}>Uwaga!</Text>}
                    dialogStyle={styles.AlertDialog}
                    actions={ [
                        <DialogButton key="option1" text="Ok" align="center" onPress={() => this.state.alertOkFunction() } />,
                        <DialogButton key="option2" text="Anuluj" align="center" onPress={() => this.popupDialog.dismiss()} />
                    ] }
                >
                    <View>
                        <Text style={styles.AlertDialogTextMessage}>{this.state.alertText}</Text>
                    </View>
                </PopupDialog>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    UserInfoContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    UserName: {
        fontSize: 25,
        margin: 15
    },
    UserDebt: {
        fontSize: 40,
        color: 'red'
    },
    ActionsMenu: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    ActionsContainer: {
        width: '70%'
    },
    ActionButton: {
        margin: 5
    },
    AlertDialog: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    AlertDialogTextMessage: {
        textAlign: 'center'
    }
})

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, actions)(DebtorProfile)