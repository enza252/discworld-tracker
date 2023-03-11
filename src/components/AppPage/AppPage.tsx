import { FunctionComponent, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { books } from "../../data"

import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { BookTiles } from "../BookTiles"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import { SidePanel } from "../SidePanel"

import { DISCWORLD_TRACKER_COOKIE_NAME } from "../../constants"

const AppPage: FunctionComponent = () => {
  const [filter, setFilter] = useState<string>("")
  const [selected, setSelected] = useState<string[]>([])
  const [cookies, setCookie] = useCookies([DISCWORLD_TRACKER_COOKIE_NAME])
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  const isSmallScreen = useMediaQuery("(max-width:600px)")

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
            {isSmallScreen ? (
              <>
                {!expanded ? (
                  <Tooltip title="Expand book information">
                    <IconButton onClick={() => setExpanded(true)}>
                      <ExpandMore />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Hide book information">
                    <IconButton onClick={() => setExpanded(false)}>
                      <ExpandLess />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : null}
          </Grid>
          {
            <Grid
              container
              item
              xs={6}
              alignContent="center"
              justifyContent="center"
            >
              {isSmallScreen ? (
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                  {filter}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                  {filter && `Saga: ${filter}`}
                </Typography>
              )}
            </Grid>
          }
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
          isSmallScreen={isSmallScreen}
          expanded={expanded}
        />
      </Grid>
    </Box>
  )
}

export { AppPage }
