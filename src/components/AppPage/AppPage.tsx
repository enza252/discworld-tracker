import { FunctionComponent, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { books } from "../../data"

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
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
  const isSaveButtonDisabled =
    selected.length === 0 ||
    cookies?.discworldTracker?.sort() === selected.sort()
  return (
    <>
      <Grid container item>
        <AppBar position="fixed">
          <Toolbar sx={{ backgroundColor: "#004ba5" }}>
            <Grid item xs={3}>
              <IconButton
                onClick={handleMenuIconClick}
                data-testid="menu-icon-button"
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
              {isSmallScreen ? (
                <>
                  {!expanded ? (
                    <Tooltip title="Expand book information">
                      <IconButton
                        onClick={() => setExpanded(true)}
                        data-testid="icon-button-expand-more"
                      >
                        <ExpandMore sx={{ color: "#fff" }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Hide book information">
                      <IconButton
                        onClick={() => setExpanded(false)}
                        data-testid="icon-button-expand-less"
                      >
                        <ExpandLess sx={{ color: "#fff" }} />
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
                {!filter && <Typography>Discworld Tracker</Typography>}
                {isSmallScreen ? (
                  <Typography sx={{ fontSize: 12, color: "#fff" }}>
                    {filter && `Saga: ${filter}`}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 18, color: "#fff" }}>
                    {filter && `Saga: ${filter}`}
                  </Typography>
                )}
              </Grid>
            }
            <Grid container item justifyContent="flex-end" xs>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: "#00b545",
                  border: !isSaveButtonDisabled ? "1px solid white" : null,
                }}
                onClick={() =>
                  setCookie(DISCWORLD_TRACKER_COOKIE_NAME, selected, {
                    path: "/",
                  })
                }
                disabled={isSaveButtonDisabled}
              >
                Save
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid container sx={{ marginTop: isSmallScreen ? "54px" : "64px" }}>
        <BookTiles
          books={books}
          filter={filter}
          handleTileClick={handleTileClick}
          selected={selected}
          isSmallScreen={isSmallScreen}
          expanded={expanded}
        />
      </Grid>
      <SidePanel
        handleOrderByClick={handleOrderByClick}
        filter={filter}
        open={showSidePanel}
        handleCloseEvent={handleCloseEvent}
      />
    </>
  )
}

export { AppPage }
