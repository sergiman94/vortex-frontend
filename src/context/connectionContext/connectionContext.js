/* eslint-disable react/prop-types */
/* eslint-disable */
import React, {useReducer, createContext} from 'react'
import { ConnectionReducer } from './connectionReducer'
import socketIoClient from 'socket.io-client'
import {API_CREDENTIALS, API_URL} from '../../modules/utils/utils'
import axios from 'axios'

export const ConnectionContext = createContext()

const initialState =  {
    host: 'host test',
    user: 'user test ',
    password: 'password test',
    name: 'name test',
}

const ConnectionContextProvider = ({children}) => {

    let socket
    let contextValues 

    const [state, dispatch] = useReducer(ConnectionReducer, initialState)
    
    /** send message to the server socket */
    const sendMessage = payload => {
        socket.emit("salutations", JSON.stringify(payload));
        dispatch({type: "OPEN_SOCKET_CONNECTION", payload})
    }

    /** send open mysql connection to the server socket */
    const openConnection = payload => {
        socket.emit("openConnection", payload)
    }

    /** send test database connection to the server socket */
    const testDatabaseConnection = (payload) => {
        socket.emit("testConnection", payload)
    }

    const handleTestDatabaseConnection = () => {
        socket.on("testConnection", payload => {
            if (payload.state && payload.state === 'connected'){
                dispatch({type: "SUCCESS_TEST_CONNECTION"})
            } else {
                dispatch({type: "FAILED_TEST_CONNECTION"})
            }
        })
    }

    /** receives mysql open connection from the server socket */
    const handleOpenConnection = () => {
        socket.on("openConnection", payload => {
            if (payload.state && payload.state === 'connected'){
                dispatch({type: "SUCCESS_OPEN_MYSQL_CONNECTION"})
            } else {
                dispatch({type: "FAILED_OPEN_MYSQL_CONNECTION"})
            }
        })
    }

    /** receives mysql open connection from the server socket */
    const setConnections = payload => {
        try {
            dispatch({type: "SUCCESS_GET_CREDENTIALS", payload})
        } catch (error) {
            dispatch({type: "FAILED_GET_CREDENTIALS"})
        }
    }

    /** force connectionState state from component */
    const changeConnectionState = payload => {
        if (payload === 'success'){
            dispatch({type: "SUCCESS_TEST_MYSQL_CONNECTION"})
        } else {
            dispatch({type: "FAILED_TEST_MYSQL_CONNECTION"})
        }
    }

    /** ------------ Graph visualization module context requests and holders  ---------- */

    // get tables, collections or other dependence related root of data
    const requestMainNodes = payload => {
        socket.emit('mainNodesRequest', payload)
    }

    /** receives mysql open connection from the server socket */
    const handleRequestMainNodes = () => {
        socket.on("mainNodesRequest", payload => {
            if (payload.data){
                dispatch({type: "SUCCESS_GET_MAIN_NODES", payload})
            } else {
                dispatch({type: "FAILED_GET_MAIN_NODES"})
            }
        })
    }


    if (!socket) {
        socket = socketIoClient(API_URL, { transports: ['websocket'] })

        contextValues = {
            socket: socket,
            openConnection,
            testDatabaseConnection, 
            handleTestDatabaseConnection,
            handleOpenConnection,
            sendMessage,
            setConnections,
            changeConnectionState,
            requestMainNodes,
            handleRequestMainNodes, 
            ...state
        }
    }


    return (
        <ConnectionContext.Provider value = {contextValues}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider