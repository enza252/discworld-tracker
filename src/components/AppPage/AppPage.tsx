import React from "react"
import { Box, Grid } from "@mui/material";
import { BookTiles } from "../BookTiles";
import { SidePanel } from "../SidePanel";


const AppPage: React.FunctionComponent = () => {

    return (
        <Box sx={{ flexGrow: 1, minWidth: "100%", minHeight: "100%" }}>
            <Grid container>
                <Grid item xs={2}>
                    <SidePanel />
                </Grid>
                <Grid item xs={10}>
                    <BookTiles />
                </Grid>
            </Grid>
        </Box>
    );
}

export { AppPage }