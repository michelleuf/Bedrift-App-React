/* eslint-disable react/jsx-key */
import React from "react";

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import CustomTabs from "../../components/Dashboard/CustomTabs/CustomTabs.js";
import DocumentsProject from "./DocumentsProject.js";

export default function ViewOneProject(props) {
    const  projectCode = props.location.state; 

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            title={projectCode}
            headerColor="primary"
            tabs={[
              {
                tabName: "Project Documents",
                tabContent: (
                 <DocumentsProject projectCode={projectCode}/>
                ),
              }
            ]}
          />
      </GridItem>
    </GridContainer>
  );
}