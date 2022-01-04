/* eslint-disable react/jsx-key */
import React from "react";

// @material-ui/core components

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import CustomTabs from "../../components/Dashboard/CustomTabs/CustomTabs.js";
import SearchProperty from "./SearchProperty.js";
import Documents from "./Documents.js";
import Rooms from "./Rooms.js";
import Projects from "./Projects.js";

export default function ViewOnePlant(props) {
    const  boligmappaNumber = props.location.state; 
    console.log(props.location.state);

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            title="All facilities"
            headerColor="primary"
            tabs={[
              {
                tabName: "Housing",
                tabContent: (
                 <Documents boligmappaNumber={boligmappaNumber}/>
                ),
              },
              {
                tabName: "Building",
                tabContent: (
                  <Projects boligmappaNumber={boligmappaNumber}/>
                ),
              },
              {
                tabName: "Building",
                tabContent: (
                  <Rooms boligmappaNumber={boligmappaNumber}/>
                ),
              }
            ]}
          />
      </GridItem>
    </GridContainer>
  );
}
