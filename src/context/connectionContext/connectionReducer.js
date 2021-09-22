/* eslint-disable*/

/** CONNECTION REDUCER IS FOR HOLDERS AT THE CONNECTION CONTEXT FILE */

export const ConnectionReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_SOCKET_CONNECTION":
            return {
                ...state
            }

        case "SUCCESS_TEST_CONNECTION":
            return {
                connectionState: 'connected'
            }    

        case "FAILED_TEST_CONNECTION":
            return {
                connectionState: 'error'
            } 

        case "SUCCESS_OPEN_MYSQL_CONNECTION":
            return {
                connectionState: 'connected'
            }    
    
        case "FAILED_OPEN_MYSQL_CONNECTION":
            return {
                connectionState: 'error'
            }
        
        case "SUCCESS_GET_MAIN_NODES":
            return {
                mainNodes: action.payload.data
            }    
    
        case "FAILED_GET_MAIN_NODES":
            return {
                mainNodes: null
            }
        

        case "SUCCESS_GET_CREDENTIALS":
            return {
                connections: action.payload
            }    
    
        case "FAILED_GET_CREDENTIALS":
            return {
                connections: null
            } 


        default:
            return state
    }
}