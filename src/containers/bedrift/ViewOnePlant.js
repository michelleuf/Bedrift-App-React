/* eslint-disable react/jsx-key */
import React from "react";

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import CustomTabs from "../../components/Dashboard/CustomTabs/CustomTabs.js";
import Documents from "./Documents.js";
import Rooms from "./Rooms.js";
import Projects from "./Projects.js";

export default function ViewOnePlant(props) {
    const  boligmappaNumber = props.location.state; 
    
  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            title="All facilities"
            headerColor="primary"
            tabs={[
              {
                tabName: "Documents",
                tabContent: (
                 <Documents boligmappaNumber={boligmappaNumber}/>
                ),
              },
              {
                tabName: "Projects",
                tabContent: (
                  <Projects boligmappaNumber={boligmappaNumber}/>
                ),
              },
              {
                tabName: "Rooms",
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
