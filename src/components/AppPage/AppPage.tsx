import { FunctionComponent, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { books } from "../../data"

import { Grid, useMediaQuery } from "@mui/material"
import { BookTiles } from "../BookTiles"

import { SidePanel } from "../SidePanel"

import { DISCWORLD_TRACKER_COOKIE_NAME } from "../../constants"
import { AppBar } from "../AppBar"

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
        <AppBar
          handleMenuIconClick={handleMenuIconClick}
          isSmallScreen={isSmallScreen}
          expanded={expanded}
          setExpanded={setExpanded}
          filter={filter}
          isSaveButtonDisabled={isSaveButtonDisabled}
          setCookie={setCookie}
          selected={selected}
        />
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
