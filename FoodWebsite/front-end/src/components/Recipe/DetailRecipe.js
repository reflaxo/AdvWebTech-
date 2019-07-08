import React from "react";

import { Page, Grid, BlogCard } from "tabler-react";


class DetailRecipe extends React.Component {

   
   
    render() {
    return (
        
        <div>

      <Page.Content title={"This is where you would see our recipe if I had the time"}>
        <Grid.Row cards deck>
          <Grid.Col sm={6} xl={3}>
           
          </Grid.Col>

        </Grid.Row>
      </Page.Content>
      </div>
    );
}
}

export default DetailRecipe;