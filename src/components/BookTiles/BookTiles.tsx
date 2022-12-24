import React from "react"
import { books } from "../../data"
import { Book } from "../../types";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: "100%",
        minHeight: "100%"
    }
}))

type BookTilesProps = {
    filter?: string
}


const BookTiles: React.FunctionComponent<BookTilesProps> = ({ filter }) => {
    const classes = useStyles()

    const renderTiles = (books: Book[]) => {
        return books.map(book => (
            <Grid item xs={2} key={book.id}>
                <Card className={classes.root}>
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
        ))
    }

    return (
        <Paper elevation={1}>
            <Grid container direction="row" spacing={2} justifyContent="stretch" alignItems="stretch">
                {filter ? renderTiles(books.filter(book => book.saga === filter)) : renderTiles(books)}
            </Grid>
        </Paper>
    )
}

export { BookTiles }