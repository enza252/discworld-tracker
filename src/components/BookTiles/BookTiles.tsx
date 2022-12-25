import React from "react"
import { books } from "../../data"
import { Book } from "../../types";
import { Card, CardContent, Grid, Button, Typography, CardHeader } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx"

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%"
    },
    selected: {
        border: "2px solid #44CF6C"
    }
}))

type BookTilesProps = {
    filter?: string,
    handleTileClick: Function,
    selected?: string[]
}

const BookTiles: React.FunctionComponent<BookTilesProps> = ({ handleTileClick, filter, selected }) => {
    const classes = useStyles()
    const renderTiles = (books: Book[]) => {
        return books.map(book => (
            <Grid item xs={2} key={book.id}>
                <Button className={classes.root} onClick={() => handleTileClick(book.id)}>
                    <Card className={clsx(classes.root, selected?.includes(book.id) ? classes.selected : null)}>
                        <CardHeader title={<Typography sx={{ fontWeight: "bold" }}>
                            {book.title}
                        </Typography>}>
                        </CardHeader>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Saga:
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                                {book.saga}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Publication Order:
                            </Typography>
                            <Typography gutterBottom>
                                {book.publicationOrder}
                            </Typography>
                        </CardContent>
                    </Card>
                </Button>
            </Grid>
        ))
    }

    return (
        <Grid container direction="row" spacing={2} justifyContent="stretch" alignItems="stretch">
            {filter ? renderTiles(books.filter(book => book.saga === filter)) : renderTiles(books)}
        </Grid>
    )
}

export { BookTiles }