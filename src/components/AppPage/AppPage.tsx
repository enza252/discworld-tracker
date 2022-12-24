import React, { useState } from "react"
import { Box, Grid } from "@mui/material";
import { BookTiles } from "../BookTiles";
import { SidePanel } from "../SidePanel";


const AppPage: React.FunctionComponent = () => {

    const [filter, setFilter] = useState<string>("")

    const handleOrderByClick = (saga: string) => {
        if (!saga) {
            setFilter("")
        }
        setFilter(saga)
    }

    return (
        <Box sx={{ flexGrow: 1, minWidth: "100%", minHeight: "100%" }}>
            <Grid container>
                <Grid item xs={2}>
                    <SidePanel handleOrderByClick={handleOrderByClick} selected={filter}/>
                </Grid>
                <Grid item xs={10}>
                    <BookTiles filter={filter} />
                </Grid>
            </Grid>
        </Box>
    );
}

export { AppPage }