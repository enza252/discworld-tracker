import React, { useState } from "react"
import { useCookies } from "react-cookie"
import { books } from "../../data"

import { Box, Button, Grid } from "@mui/material"
import { BookTiles } from "../BookTiles"
import { SidePanel } from "../SidePanel"

import { DISCWORLD_TRACKER_COOKIE_NAME } from "../../constants"

const AppPage: React.FunctionComponent = () => {
  const [filter, setFilter] = useState<string>("")
  const [selected, setSelected] = useState<string[]>([])
  const [cookies, setCookie] = useCookies([DISCWORLD_TRACKER_COOKIE_NAME])

  React.useEffect(() => {
    if (
      selected.length === 0 &&
      cookies.discworldTracker &&
      cookies.discworldTracker.length > 0
    ) {
      setSelected(cookies.discworldTracker)
    }
  }, [])

  const handleOrderByClick = (saga: string) => {
    if (!saga) {
      setFilter("")
    }
    setFilter(saga)
  }

  const handleTileClick = (id: string) => {
    if (!selected.includes(id)) {
      setSelected((prevState) => [...prevState, id])
    } else {
      setSelected(selected.filter((s) => s !== id))
    }
  }

  return (
    <Box sx={{ flexGrow: 1, minWidth: "100%", minHeight: "100%" }}>
      <Grid container>
        <Grid item xs={2}>
          <SidePanel handleOrderByClick={handleOrderByClick} filter={filter} />
        </Grid>
        <Grid item xs={10}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() =>
                  setCookie(DISCWORLD_TRACKER_COOKIE_NAME, selected, {
                    path: "/",
                  })
                }
                disabled={
                  selected.length === 0 ||
                  cookies?.discworldTracker?.sort() === selected.sort()
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <BookTiles
              books={books}
              filter={filter}
              handleTileClick={handleTileClick}
              selected={selected}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export { AppPage }
