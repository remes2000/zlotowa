export const GET_DEBTORS = 'get_debtors'
export const SET_CURRENT_USER = 'set_current_user'

import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({name: 'zlotowa.db', createFromLocation: '~zlotowa.db'})

export const getDebtors = () => dispatch => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Debtors', [], (tx, results) => {
            console.log("Query completed");
            dispatch({type: GET_DEBTORS, payload: results.rows.raw()})
          })
    })
}

export const addDebtor = ({name, surname, debt, currency}, color) => dispatch => {
    db.transaction( tx => {

        tx.executeSql(`INSERT INTO Debtors (Name, Surname, Debt, Currency, Color) VALUES ( '${name}', '${surname}', ${debt}, '${currency}', '${color}')`, [], (tx, results) => {
            console.log("Debtor inserted")
            dispatch({type: 'Main'})
        })

    })
}

export const setCurrentUser = user => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    })
}

export const deleteDebtor = id => dispatch => {
    db.transaction( tx => {

        tx.executeSql(`DELETE FROM Debtors WHERE Id=?`, [id], (tx, results) => {
            console.log("Debtor deleted")
            dispatch({type: 'Main'})
        })

    })
}

export const setDebtTo = (id, value) => dispatch => {
    db.transaction( tx => {

        tx.executeSql(`UPDATE Debtors SET Debt=? WHERE Id=?`, [value, id], (tx, results) => {
            dispatch({type: 'Main'})
        })

    })
}