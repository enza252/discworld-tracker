import { FunctionComponent, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { books } from "../../data"

import { Box, Button, Grid, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { BookTiles } from "../BookTiles"
import { SidePanel } from "../SidePanel"

import { DISCWORLD_TRACKER_COOKIE_NAME } from "../../constants"

const AppPage: FunctionComponent = () => {
  const [filter, setFilter] = useState<string>("")
  const [selected, setSelected] = useState<string[]>([])
  const [cookies, setCookie] = useCookies([DISCWORLD_TRACKER_COOKIE_NAME])
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false)

  useEffect(() => {
    if (
      selected.length === 0 &&
      cookies.discworldTracker &&
      cookies.discworldTracker.length > 0
    ) {
      setSelected(cookies.discworldTracker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOrderByClick = (saga: string) => {
    if (!saga) {
      setFilter("")
    }
    setFilter(saga)
    closeSidePanel()
  }

  const handleTileClick = (id: string) => {
    if (!selected.includes(id)) {
      setSelected((prevState) => [...prevState, id])
    } else {
      setSelected(selected.filter((s) => s !== id))
    }
  }

  const handleMenuIconClick = () => {
    setShowSidePanel(!showSidePanel)
  }

  const closeSidePanel = () => {
    setShowSidePanel(false)
  }

  const handleCloseEvent = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      closeSidePanel()
    }
    closeSidePanel()
  }

  return (
    <Box sx={{ flexGrow: 1, minWidth: "100%", minHeight: "100%" }}>
      <Grid container>
        <SidePanel
          handleOrderByClick={handleOrderByClick}
          filter={filter}
          open={showSidePanel}
          handleCloseEvent={handleCloseEvent}
        />
        <Grid container>
          <Grid container item xs>
            <IconButton
              onClick={handleMenuIconClick}
              data-testid="menu-icon-button"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid container item justifyContent="flex-end" xs>
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
        <BookTiles
          books={books}
          filter={filter}
          handleTileClick={handleTileClick}
          selected={selected}
        />
      </Grid>
    </Box>
  )
}

export { AppPage }
