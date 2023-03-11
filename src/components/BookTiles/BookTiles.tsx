import { FunctionComponent } from "react"
import { Book } from "../../types"
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  CardHeader,
  useMediaQuery,
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
  filter?: string
  selected?: string[]
}

const BookTiles: FunctionComponent<BookTilesProps> = ({
  books,
  handleTileClick,
  filter,
  selected,
}) => {
  const classes = useStyles()
  const isSmallScreen = useMediaQuery("(max-width:600px)")

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
              <Collapse>{renderCardContent(book)}</Collapse>
            ) : (
              renderCardContent(book)
            )}
          </Card>
        </Button>
      </Grid>
    ))

    function renderCardContent(book: Book) {
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
  }

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="center"
      alignContent="center"
      alignItems="stretch"
    >
      {filter
        ? renderTiles(books.filter((book) => book.saga === filter))
        : renderTiles(books)}
    </Grid>
  )
}

export { BookTiles }
