import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { books } from "../../data"
import React from "react"

const useStyles = makeStyles(() => ({
    root: {
        minWidth: "100%",
        minHeight: "100%"
    }
}))

const AppPage: React.FunctionComponent = () => {

    const classes = useStyles()

    return (
        <Box sx={{ flexGrow: 1, minWidth: "100%", minHeight: "100%" }}>
            <Paper elevation={1}>
                <Grid container direction="row" spacing={2} justifyContent="stretch" alignItems="stretch">
                    {books.map(book => (
                        <Grid item xs={2}>
                            <Card key={book.id}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Title:
                                    </Typography>
                                    <Typography>
                                        {book.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Saga:
                                    </Typography>
                                    <Typography>
                                        {book.saga}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Publication Order:
                                    </Typography>
                                    <Typography>
                                        {book.publicationOrder}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}

export { AppPage }