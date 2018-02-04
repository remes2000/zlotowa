export const GET_DEBTORS = 'get_debtors'

import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({name: 'test1.db', createFromLocation: '~zlotowa.db'})

export const getDebtors = () => dispatch => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Debtors', [], (tx, results) => {
            console.log("Query completed");
            dispatch({type: GET_DEBTORS, payload: results.rows.raw()})
          })
    })
}