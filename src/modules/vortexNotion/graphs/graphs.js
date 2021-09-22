/*eslint-disable*/

import React, {useContext, useEffect} from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

// styles 
import extendedFormsStyles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import customSelectStyles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import cardImagesStyles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.js";

// connectionContext
import { ConnectionContext } from "context/connectionContext/connectionContext";
import axios from "axios";
import { API_CONNECTIONS } from "modules/utils/utils";
import ThreejsGraphComponent from "modules/threejs/threeJsGraph/threeJsGraph";
import pic from '../../../assets/pics/waitin_image.png'

// use styles 
const useCustomSelectStyles = makeStyles(customSelectStyles)
const useExtendedFormsStyles = makeStyles(extendedFormsStyles);
const useCardImagesStyles = makeStyles(cardImagesStyles)

export default function GraphsComponent() {

    /** style classes*/
    const customSelectClasses = useCustomSelectStyles()
    const extendedFormsClasses = useExtendedFormsStyles()
    const cardImagesClasses = useCardImagesStyles()

    /** connection context */
    const {
         connections,
         setConnections,
         requestMainNodes,
         mainNodes, 
         handleRequestMainNodes
        } = useContext(ConnectionContext)

    const [currentConnections, setCurrentConnectins] = React.useState([])
    const [currentConnectionSelect, setCurrentConnectionSelect] = React.useState("");

    const handleCurrentConnectionSelect = async event => {
        await setCurrentConnectionSelect(event.target.value)
        let currentConnection = currentConnections.find(conn => conn.credentials.database === event.target.value)
        let currentConnectionCredentials = currentConnection.credentials

        let requestMainNodesBody = {
            credentials: currentConnectionCredentials,
            action: 'get-main-nodes'
        }

        requestMainNodes(requestMainNodesBody)
    };

    React.useEffect(async () => {
        handleRequestMainNodes()

        
    })

    React.useEffect(async () => {
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

    }, []);
    
    
    return (
        <div>

        {/** upper container */}
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
            <Card>
                <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    <Today />
                </CardIcon>
                <h4 className={extendedFormsClasses.cardIconTitle}>Current Connections</h4>
                </CardHeader>
                <CardBody>
                <InputLabel className={extendedFormsClasses.label}>Select a connection</InputLabel>
                <br />
                <FormControl fullWidth>
                <Select
                    MenuProps={{
                        className: customSelectClasses.selectMenu
                    }}
                    classes={{
                        select: customSelectClasses.select
                    }}
                    value={currentConnectionSelect}
                    onChange={handleCurrentConnectionSelect}
                    inputProps={{
                    name: "simpleSelect",
                    id: "simple-select"
                    }}
                >
                    <MenuItem
                    disabled
                    classes={{
                        root: customSelectClasses.selectMenuItem
                    }}
                    >
                    Single Select
                    </MenuItem>
                    
                    {currentConnections.map((connection, index) => (
                        connection.open ?
                        <MenuItem
                        key={index}
                        classes={{
                            root: customSelectClasses.selectMenuItem,
                            selected: customSelectClasses.selectMenuItemSelected
                        }}
                        value={connection.credentials.database}
                        >
                        {connection.credentials.database}
                        </MenuItem> : null
                    ))}
                    
                </Select>
                </FormControl>
                </CardBody>
            </Card>
            </GridItem>
            
            {currentConnectionSelect !== "" ? 
            <GridItem xs={12} sm={12} md={4}>
            <Card>
                <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    <LibraryBooks />
                </CardIcon>
                <h4 className={extendedFormsClasses.cardIconTitle}>Connection Details</h4>
                </CardHeader>
                <CardBody>
                {/* <InputLabel className={extendedFormsClasses.label}>sEE</InputLabel> */}
                <br />
                <FormControl fullWidth>
                    
                </FormControl>
                </CardBody>
            </Card>
            </GridItem>
            : <></>}

            {currentConnectionSelect !== "" ? 
                <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <AvTimer />
                    </CardIcon>
                    <h4 className={extendedFormsClasses.cardIconTitle}>Connection Map</h4>
                    </CardHeader>
                    <CardBody>
                    {/* <InputLabel className={extendedFormsClasses.label}>Time Picker</InputLabel> */}
                    <br />
                    <FormControl fullWidth>
                        
                    </FormControl>
                    </CardBody>
                </Card>
                </GridItem>
            
            : <></>}
        </GridContainer>
            
        {/** graph visualization container */}
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                {/** graph visualization card */}
            <Card>
                <CardBody id="graph-id" >
                    {currentConnectionSelect !== "" ? 
                    <ThreejsGraphComponent></ThreejsGraphComponent> : <></>}
                </CardBody>
                { currentConnectionSelect === ""  ? 
                    <img
                    className={cardImagesClasses.cardImgTop}
                    // data-src="holder.js/100px180/"
                    // alt="100%x180"
                    //style={{ height: "180px", width: "100%", display: "block" }}
                    src={pic}
                    // data-holder-rendered="true"
                    /> : 
                    null }
            </Card>
            </GridItem>
        </GridContainer>
        </div>
    );
}
