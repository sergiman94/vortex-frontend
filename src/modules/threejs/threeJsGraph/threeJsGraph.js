/*eslint-disable*/

import React, {useContext, useEffect} from "react";
import pic from '../../../assets/pics/waitin_image.png'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// styles
import cardImagesStyles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.js";

// connectionContext
import { ConnectionContext } from "context/connectionContext/connectionContext";

// use styles
const useCardImagesStyles = makeStyles(cardImagesStyles)

export default function ThreejsGraphComponent() {

    // classes
    const cardImagesClasses = useCardImagesStyles()

    /** connection context */
    const {
        mainNodes, 
       } = useContext(ConnectionContext)


    React.useEffect(()  => {
        console.log('MainNodes --> ', mainNodes);
    })

    const N = mainNodes ? Object.keys(mainNodes).length : 0 // N was 300

    if (N > 0) {
        const gData = {
            nodes: [...Array(N).keys()].map(i => ({ id: i, collapsed: i !== rootId, childLinks: [] })),
            links: [...Array(N).keys()]
              .filter(id => id)
              .map(id => ({
                source: Math.round(Math.random() * (id - 1)),
                target: id
              }))
          };

        const nodesById = Object.fromEntries(gData.nodes.map(node => [node.id, node]));
        gData.links.forEach(link => {
          nodesById[link.source].childLinks.push(link);
        });
    
        const rootId = 0;
        const getPrunedTree = () => {
          const visibleNodes = [];
          const visibleLinks = [];
    
          (function traverseTree(node = nodesById[rootId]) {
            visibleNodes.push(node);
            if (node.collapsed) return;
            visibleLinks.push(...node.childLinks);
            node.childLinks
              .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
              .forEach(traverseTree);
          })(); // IIFE
    
          return { nodes: visibleNodes, links: visibleLinks };
        };
    
        const elem = document.getElementById('graph-id');
        const Graph = ForceGraph3D()(elem)
          .graphData(getPrunedTree())
          .linkDirectionalParticles(2)
          .nodeColor(node => !node.childLinks.length ? 'green' : node.collapsed ? 'red' : 'yellow')
          .onNodeHover(node => elem.style.cursor = node && node.childLinks.length ? 'pointer' : null)
          .onNodeClick(node => {
            if (node.childLinks.length) {
              node.collapsed = !node.collapsed; // toggle collapse state
              Graph.graphData(getPrunedTree());
            }
          });
    
        Graph.width(elem.clientWidth - 40)
    }

    return (
        <>
        <img
                    className={cardImagesClasses.cardImgTop}
                    // data-src="holder.js/100px180/"
                    // alt="100%x180"
                    //style={{ height: "180px", width: "100%", display: "block" }}
                    src={pic}
                    // data-holder-rendered="true"
                    /> : 
        </>
    )
}