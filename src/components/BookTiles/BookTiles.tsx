import { FunctionComponent } from "react"
import { Book } from "../../types"
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  CardHeader,
  Collapse,
} from "@mui/material"
import { makeStyles } from "@mui/styles"

import clsx from "clsx"

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "200px",
    height: "100%",
  },
  selected: {
    border: "1px solid #44CF6C",
  },
}))

type BookTilesProps = {
  books: Book[]
  handleTileClick: Function
  isSmallScreen: boolean
  expanded: boolean
  selected?: string[]
  filter?: string
}

const BookTiles: FunctionComponent<BookTilesProps> = ({
  books,
  handleTileClick,
  isSmallScreen,
  expanded,
  filter,
  selected,
}) => {
  const classes = useStyles()

  const renderCardContent = (book: Book) => {
    return (
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
        <Typography gutterBottom>{book.publicationOrder}</Typography>
      </CardContent>
    )
  }

  const renderTiles = (books: Book[]) => {
    return books.map((book) => (
      <Grid item key={book.id}>
        <Button
          className={classes.root}
          onClick={() => handleTileClick(book.id)}
        >
          <Card
            className={clsx(
              classes.root,
              selected?.includes(book.id) ? classes.selected : null
            )}
            sx={{
              minWidth: isSmallScreen ? "190px" : null,
              minHeight: isSmallScreen ? "80px" : null,
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ fontWeight: "bold" }}>
                  {`${
                    isSmallScreen ? `${book.publicationOrder.toString()}. ` : ""
                  }${book.title}`}
                </Typography>
              }
            ></CardHeader>
            {isSmallScreen ? (
              <>
                <Collapse in={expanded} unmountOnExit>
                  {renderCardContent(book)}
                </Collapse>
              </>
            ) : (
              renderCardContent(book)
            )}
          </Card>
        </Button>
      </Grid>
    ))
  }

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="center"
      alignContent="center"
      alignItems="stretch"
      sx={{ marginTop: isSmallScreen ? "54px" : "64px" }}
    >
      {filter
        ? renderTiles(books.filter((book) => book.saga === filter))
        : renderTiles(books)}
    </Grid>
  )
}

export { BookTiles }
