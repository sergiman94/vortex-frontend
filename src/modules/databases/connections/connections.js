/*eslint-disable*/
/* eslint-disable react/prop-types */
import React, {useContext, useEffect} from "react";
import axios from 'axios'
import {API_CONNECTIONS, API_URL} from '../../utils/utils'
// import cx from "classnames";
import PropTypes from "prop-types";

// connection context
import { ConnectionContext } from "context/connectionContext/connectionContext.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import Build from "@material-ui/icons/Build";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PowerOff from '@material-ui/icons/PowerOff';
import Power from '@material-ui/icons/Power';
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";
import People from "@material-ui/icons/People";
import BorderColor from "@material-ui/icons/BorderColor";
import AccountTree from "@material-ui/icons/AccountTree";


// core components
// import Badge from "components/Badge/Badge.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Badge from "components/Badge/Badge.js";
import Snackbars from "components/Snackbar/Snackbar.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

// component styles
import validationFormsStyles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import extendedFormsStyles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import buttonsStyles from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import modalStyles from "assets/jss/material-dashboard-pro-react/modalStyle.js";

const useButtonsStyles = makeStyles(buttonsStyles)
const useValidationFormsStyles = makeStyles(validationFormsStyles)
const useExtendedFormsStyles = makeStyles(extendedFormsStyles)
const useModalStyles = makeStyles(modalStyles)

/** for modal purposes */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Connections() {
    
    //styles classes 
    const validationFormsClasses = useValidationFormsStyles();
    const extendedFormsClasses = useExtendedFormsStyles()
    const buttonsClasses = useButtonsStyles()
    const modalClasses = useModalStyles()

//   const { stories, simple } = props;
//   const timelineClass = classes.timeline + " " + cx({[classes.timelineSimple]: simple,});

    const [requiredState, setrequiredState] = React.useState("");
    const [required, setrequired] = React.useState("");
    const [databaseEngine, setDatabaseEngine] = React.useState(null) 
    const [editionsModal, setEditionsModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [connectionToEdit, setConnectionToEdit] = React.useState({credentials: ''})
    const [connectionToPlug, setConnectionToPlug] = React.useState({credentials: ''})
    const [connectionToDelete, setConnectionToDelete] = React.useState({})

    const [testCredentials, setTestCredentials] = React.useState(null)
    const [tl, setTl] = React.useState(false);


    /** connection context */
    const {
        sendMessage,
         connections,
         connectionState,
         testDatabaseConnection, 
         handleTestDatabaseConnection,
         handleOpenConnection,
         setConnections,
         openConnection,
         changeConnectionState,
        } = useContext(ConnectionContext)

    const [currentConnections, setCurrentConnectins] = React.useState([])

    /** context use effect (receive response from backend)*/
    useEffect(() => {
        // const socket = socketIoClient(API_URL, { transports: ['websocket', 'polling', 'flashsocket'] })
        // console.log(socket)
        //sendMessage(testPayload)
        handleTestDatabaseConnection()
        handleOpenConnection()
    })

    /** api use effect (ask or send request to backend)*/
    useEffect(async () => {

        let dbConnections = await (await axios.get(API_CONNECTIONS)).data

        if (dbConnections.data) {
            // set to module state
            setCurrentConnectins(dbConnections.data)

            // set to connections context
            if (!connections) {
                setConnections(dbConnections.data)
            } else {
                setConnections(connections)
            }
            
        }
        
    }, [])
    
    /** for snackbar and UI components */
    useEffect(() => {
        // Specify how to clean up after this effect:
        return function cleanup() {
          // to stop the warning of calling setTl of unmounted component
          var id = window.setTimeout(null, 0);
          while (id--) {
            window.clearTimeout(id);
          }
        };
    });

    // function that verifies if a string has a given length or not
    const handleValidation = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
   
    /** form open connection button */
    const handleOpeningConnection = () => {
        setTl(true)
        if (requiredState === "") {
            setrequiredState("error");
        }

        testCredentials.port = testCredentials.port || 3306
        testCredentials.db_engine = databaseEngine || null
        openConnection(testCredentials)

        // TODO: use this to make the notification autoclose (not working at the moment)
        setTimeout(function() {setTl(false)},6000);

    };

    /** form test connection button */
    const handleTestConnection = () => {
        setTl(true);
        if (requiredState === "") {
            setrequiredState("error");
        }
        testCredentials.port = testCredentials.port || 3306
        testCredentials.db_engine = databaseEngine || ''
        testDatabaseConnection(testCredentials)

        // TODO: use this to make the notification autoclose (not working at the moment)
        setTimeout(function() {setTl(false)},6000);
        
    };

    /** create connection dropdown */
    const handleCreateConnection = (value) => {
        setDatabaseEngine(value)
    }

    /** form cancel connection */
    const handleCancelNewConnection = () => {
        setDatabaseEngine(null)
    } 
    /** each connection settings dropdown */
    const handleDropdownClick = (e, currentConnectionsIndex) => {
        switch (e) {
            case 'Edit':
                setConnectionToEdit(currentConnections[currentConnectionsIndex])   
                setEditionsModal(true)

                break;
            case 'Delete':
                setConnectionToDelete(currentConnections[currentConnectionsIndex]) 
                setDeleteModal(true)
            
                break;
            default:
                break;
        }
    }

    const handlePlugClick = async (e, currentConnectionIndex) => {

        setConnectionToPlug(currentConnections[currentConnectionIndex])
        

        try {
            if (!connectionToPlug.key) {
                console.error('connection doesnt have a key to identify')
                return 
            }

            let changes = {
                credentials: {
                    host: connectionToPlug.credentials.host,
                    user: connectionToPlug.credentials.user,
                    database: connectionToPlug.credentials.database
                },
                open: !connectionToPlug.open, 
                db_engine: connectionToPlug.db_engine,
            }

            console.log('update PLUG CONNECTION changes --> ', changes)

            const request = axios.create({timeout: 5000})
            let connectionUpdated = await request.put(`${API_CONNECTIONS}/${connectionToPlug.key}`, changes)

            console.log('Connection updated --> ', connectionUpdated)
            changeConnectionState('success')
            
        } catch (error) {
            console.error('Error updating connection --> ', error)
        }
    }

    /** Update connection credentials */
    const handleConnectionUpdate = async () => {
        setEditionsModal(false)

        try {

            if (!connectionToEdit.key) {
                console.error('connection doesnt have a key to identify')
                return 
            }

            let changes = {
                credentials: {
                    host: connectionToEdit.credentials.host,
                    user: connectionToEdit.credentials.user,
                    database: connectionToEdit.credentials.database
                },
                db_engine: connectionToEdit.db_engine,
            }

            console.log('update connection changes --> ', changes)

            const request = axios.create({timeout: 5000})
            let connectionUpdated = await request.put(`${API_CONNECTIONS}/${connectionToEdit.key}`, changes)

            console.log('Connection updated --> ', connectionUpdated)
            changeConnectionState('success')
            setTl(true)
        } catch (error) {
            console.error('Error updating connection --> ', error)
            changeConnectionState('error')
            setTl(true)
        }
        

    }

    /** Delete connection credentials */
    const handleConnectionDelete = async () => {
        setDeleteModal(false)
        
        try {

            if (!connectionToDelete.key) {
                console.error('credential doesnt have a key to identify')
                return 
            }

            const request = axios.create({timeout: 5000})
            let connectionUpdated = await request.delete(`${API_CONNECTIONS}/${connectionToDelete.key}`)

            console.log('Connection deleted --> ', connectionUpdated)
            changeConnectionState('success')
            setTl(true)
        } catch (error) {
            console.error('Error deleting connection --> ', error)
            changeConnectionState('error')
            setTl(true)
        }

    }

  return (
    <>
        {/* Create button */}
        <GridContainer>
            <GridItem>
                <CustomDropdown
                    hoverColor="info"
                    buttonText="Create new connection"
                    onClick={(event) => handleCreateConnection(event)}
                    buttonProps={{
                        round: true,
                        fullWidth: true,
                        style: { marginBottom: "0" },
                        color: "info",
                    }}
                    dropdownHeader="Select database"
                    dropdownList={[
                        "MySQL",
                        "PostgreSQL",
                        "MongoDB"
                    ]}>
                </CustomDropdown>
            </GridItem>
        </GridContainer>
        
        {/* Validation form */}
        {databaseEngine !== null ? 
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info" text>
                        <CardText color="info">
                        <h4 className={validationFormsClasses.cardTitle}>New {databaseEngine} Connection</h4>
                        </CardText>
                    </CardHeader>
                    <CardBody>
                        <form>
                            {/* database host input*/}
                            <GridContainer>
                                <GridItem xs={1} sm={2}>
                                    <FormLabel className={validationFormsClasses.labelHorizontal}>
                                        host
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <CustomInput
                                    success={requiredState === "success"}
                                    error={requiredState === "error"}
                                    id="required"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                    inputProps={{
                                    onChange: (event) => {
                                        if (handleValidation(event.target.value, 0)) {
                                            setrequiredState("success");
                                            setTestCredentials({...testCredentials, host: event.target.value})
                                        } else {
                                            setrequiredState("error");
                                        }
                                        setrequired(event.target.value);
                                    },
                                    type: "text",
                                    endAdornment:
                                        requiredState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={validationFormsClasses.danger} />
                                        </InputAdornment>
                                        ) : undefined,
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <FormLabel className={validationFormsClasses.labelLeftHorizontal}>
                                        <code>required</code>
                                    </FormLabel>
                                </GridItem>
                            </GridContainer>
                            
                            {/* database port input*/}
                            <GridContainer>
                                <GridItem xs={1} sm={2}>
                                    <FormLabel className={validationFormsClasses.labelHorizontal}>
                                        port
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <CustomInput
                                    success={requiredState === "success"}
                                    error={requiredState === "error"}
                                    id="required"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                    inputProps={{
                                    onChange: (event) => {
                                        if (handleValidation(event.target.value, 0)) {
                                            setrequiredState("success");
                                            setTestCredentials({...testCredentials, port: event.target.value})
                                        } else {
                                            setrequiredState("error");
                                        }
                                        setrequired(event.target.value);
                                    },
                                    type: "text",
                                    endAdornment:
                                        requiredState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={validationFormsClasses.danger} />
                                        </InputAdornment>
                                        ) : undefined,
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <FormLabel className={validationFormsClasses.labelLeftHorizontal}>
                                        <code>required</code>
                                    </FormLabel>
                                </GridItem>
                            </GridContainer>
                            
                            
                            {/* database user input*/}
                            <GridContainer>
                                <GridItem xs={1} sm={2}>
                                    <FormLabel className={validationFormsClasses.labelHorizontal}>
                                        User
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <CustomInput
                                    success={requiredState === "success"}
                                    error={requiredState === "error"}
                                    id="required"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                    inputProps={{
                                    onChange: (event) => {
                                        if (handleValidation(event.target.value, 0)) {
                                            setrequiredState("success");
                                            setTestCredentials({...testCredentials, user: event.target.value})
                                        } else {
                                            setrequiredState("error");
                                        }
                                        setrequired(event.target.value);
                                    },
                                    type: "text",
                                    endAdornment:
                                        requiredState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={validationFormsClasses.danger} />
                                        </InputAdornment>
                                        ) : undefined,
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <FormLabel className={validationFormsClasses.labelLeftHorizontal}>
                                        <code>required</code>
                                    </FormLabel>
                                </GridItem>
                            </GridContainer>
                            
                            {/* database password input*/}
                            <GridContainer>
                                <GridItem xs={1} sm={2}>
                                    <FormLabel className={validationFormsClasses.labelHorizontal}>
                                        password
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <CustomInput
                                    success={requiredState === "success"}
                                    error={requiredState === "error"}
                                    id="required"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                    inputProps={{
                                    onChange: (event) => {
                                        if (handleValidation(event.target.value, 0)) {
                                            setrequiredState("success");
                                            setTestCredentials({...testCredentials, password: event.target.value})
                                        } else { 
                                            setrequiredState("error");
                                        }
                                        setrequired(event.target.value);
                                    },
                                    type: "password",
                                    endAdornment:
                                        requiredState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={validationFormsClasses.danger} />
                                        </InputAdornment>
                                        ) : undefined,
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <FormLabel className={validationFormsClasses.labelLeftHorizontal}>
                                        <code>required</code>
                                    </FormLabel>
                                </GridItem>
                            </GridContainer>

                            {/* database name input*/}
                            <GridContainer>
                                <GridItem xs={1} sm={2}>
                                    <FormLabel className={validationFormsClasses.labelHorizontal}>
                                        database
                                    </FormLabel>
                                </GridItem>
                                <GridItem xs={12} sm={7}>
                                    <CustomInput
                                    success={requiredState === "success"}
                                    error={requiredState === "error"}
                                    id="required"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                    inputProps={{
                                    onChange: (event) => {
                                        if (handleValidation(event.target.value, 0)) {
                                            setrequiredState("success");
                                            setTestCredentials({...testCredentials, database: event.target.value})
                                        } else {
                                            setrequiredState("error");
                                        }
                                        setrequired(event.target.value);
                                    },
                                    type: "text",
                                    endAdornment:
                                        requiredState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={validationFormsClasses.danger} />
                                        </InputAdornment>
                                        ) : undefined,
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <FormLabel className={validationFormsClasses.labelLeftHorizontal}>
                                        <code>required</code>
                                    </FormLabel>
                                </GridItem>
                            </GridContainer>

                        </form>
                    </CardBody>

                    {/* database buttons*/}
                    <CardFooter className={validationFormsClasses.justifyContentCenter}>
                        <Button color="danger" onClick={handleCancelNewConnection}>
                        Cancel
                        </Button>
                        <Button color="info" onClick={handleTestConnection}>
                        Test Connection
                        </Button>
                        <Button color="info" onClick={handleOpeningConnection}>
                        Connect
                        </Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
        : <></>}

        {/* Current connections*/}
        <GridContainer>
        {currentConnections.map((connection, index) => (
                <GridItem xs={12} sm={12} md={4} key={index} >
                    <Card>
                        <CardHeader color="info" icon>
                            <CardIcon color="info">
                                <SettingsInputHdmiIcon />
                            </CardIcon>
                                <h4 className={extendedFormsClasses.cardIconTitle}>{connection.db_engine}</h4>   
                        </CardHeader>
                        <CardBody>
                            <InputLabel className={extendedFormsClasses.label}>Database Name</InputLabel>
                                <h5 className={extendedFormsClasses.cardIconTitle}>{connection.credentials.database}</h5>
                            <br />
                            <InputLabel className={extendedFormsClasses.label}>Host</InputLabel>
                                <h5 className={extendedFormsClasses.cardIconTitle}>{connection.credentials.host}</h5>
                            <br />
                            <InputLabel className={extendedFormsClasses.label}>User</InputLabel>
                                <h5 className={extendedFormsClasses.cardIconTitle}>{connection.credentials.user}</h5>
                            <br />
                        
                        </CardBody>
                        <CardFooter>
                        <Badge color={connection && connection.open ? 'success': 'danger'}>{connection && connection.open ? 'Connected': 'Not Connected'}</Badge>
                        <Button 
                        color={connection && connection.open ? 'danger': 'success'} 
                        round
                        className={buttonsClasses.marginRight} 
                        onClick = {(e) => handlePlugClick(e, index)}>
                            {connection && connection.open ? <PowerOff className={buttonsClasses.icons} /> : <Power className={buttonsClasses.icons} />}
                        </Button>
                        <CustomDropdown
                            onClick = {(e) => handleDropdownClick(e, index)}
                            buttonIcon={Build}
                            buttonProps={{
                            round: true,
                            // style: { marginBottom: "0" },
                            color: "info",
                            }}
                            dropdownList={[
                                "Edit",
                                { divider: true },
                                "Delete",
                            ]}
                        />
                        </CardFooter>
                    </Card>
                </GridItem>
            
        ))} 
        </GridContainer>    

        {/** modal for edit connection */}
        <Dialog
            classes={{
            root: modalClasses.center,
            paper: modalClasses.modal
            }}
            open={editionsModal}
            transition={Transition}
            keepMounted
            onClose={() => setEditionsModal(false)}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
            >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={modalClasses.modalHeader}>
                <Button justIcon className={modalClasses.modalCloseButton} key="close" aria-label="Close" color="transparent" onClick={() => setEditionsModal(false)}>
                    <Close className={modalClasses.modalClose} />
                </Button>
                <h4 className={modalClasses.modalTitle}>Do you want to update this {connectionToEdit.db_engine} connection ? </h4>
            </DialogTitle>
            <DialogContent id="modal-slide-description" className={modalClasses.modalBody}>
                <CustomInput
                    labelText={`Click here to change current Database Name --> ${connectionToEdit.credentials.database} `}
                    id="material"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: (event) => {
                            let connection = {...connectionToEdit}
                            let connectionDatabase = connection.credentials.database
                            if (event.target.value.length > 0) {
                                connection.credentials.database = event.target.value
                                setConnectionToEdit(connection)
                            } else {
                                let connection = {...connectionToEdit}
                                connection.credentials.database = connectionDatabase
                                setConnectionToEdit(connection)
                            }
                        },
                        endAdornment: (<InputAdornment position="end"><BorderColor/></InputAdornment>),
                    }}
                />
                <CustomInput
                    labelText={`Click here to change current Host --> ${connectionToEdit.credentials.host} `}
                    id="material"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: (event) => {
                            let connection = {...connectionToEdit}
                            let connectionHost = connection.credentials.host
                            if (event.target.value.length > 0) {
                                connection.credentials.host = event.target.value
                                setConnectionToEdit(connection)
                            } else {
                                let connection = {...connectionToEdit}
                                connection.credentials.host = connectionHost
                                setConnectionToEdit(connection)
                            }
                        },
                        endAdornment: (<InputAdornment position="end"><AccountTree/></InputAdornment>)
                    }}
                />
                <CustomInput
                    labelText={`Click here to change current User --> ${connectionToEdit.credentials.user} `}
                    id="material"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: (event) => {
                            let connection = {...connectionToEdit}
                            let connectionUser = connection.credentials.user
                            if (event.target.value.length > 0) {
                                connection.credentials.user = event.target.value
                                setConnectionToEdit(connection)
                            } else {
                                let connection = {...connectionToEdit}
                                connection.credentials.user = connectionUser
                                setConnectionToEdit(connection)
                            }
                        },
                        endAdornment: (<InputAdornment position="end"><People/></InputAdornment>)
                    }}
                />
                
            </DialogContent>
            <DialogActions className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}>
                <Button onClick={() => setEditionsModal(false)}>Never Mind</Button>
                <Button onClick={() => handleConnectionUpdate()} color="success">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
                       

        {/** modal for delete connection */}
        <Dialog
            classes={{
            root: modalClasses.center,
            paper: modalClasses.modal
            }}
            open={deleteModal}
            transition={Transition}
            keepMounted
            onClose={() => setDeleteModal(false)}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
            >
            <DialogTitle id="classic-modal-slide-title" disableTypography className={modalClasses.modalHeader}>
                <Button justIcon className={modalClasses.modalCloseButton} key="close" aria-label="Close" color="transparent" onClick={() => setDeleteModal(false)}>
                    <Close className={modalClasses.modalClose} />
                </Button>
                <h4 className={modalClasses.modalTitle}>Do you want to delete this {connectionToDelete.db_engine} connection ? </h4>
            </DialogTitle>
            <DialogContent id="modal-slide-description" className={modalClasses.modalBody}>
                
                
            </DialogContent>
            <DialogActions className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}>
                <Button onClick={() => setDeleteModal(false)}>Never Mind</Button>
                <Button color="danger" onClick={() => handleConnectionDelete()} color="success">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
                 

        {/** snackbar for notifications*/}
        <Snackbars
            place="tl"
            color= {connectionState === 'connected' ? 'success': 'danger'}
            icon={AddAlert}
            message={connectionState === 'connected' ? 'Action succesful': 'Action failed'}
            open={tl}
            closeNotification={() => setTl(false)}
            close
        />
    </>
  );
}

Connections.propTypes = {
  //stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool,
};
