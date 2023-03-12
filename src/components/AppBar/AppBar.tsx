import {
  AppBar as MuiAppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { DISCWORLD_TRACKER_COOKIE_NAME } from "../../constants"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import { FunctionComponent } from "react"

type AppBarProps = {
  handleMenuIconClick: Function
  isSmallScreen: boolean
  expanded: boolean
  setExpanded: Function
  filter: string
  isSaveButtonDisabled: boolean
  setCookie: Function
  selected: string[]
}

const AppBar: FunctionComponent<AppBarProps> = ({
  handleMenuIconClick,
  isSmallScreen,
  expanded,
  setExpanded,
  filter,
  isSaveButtonDisabled,
  setCookie,
  selected,
}) => {
  return (
    <Grid container item>
      <MuiAppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#004ba5" }}>
          <Grid item xs={3}>
            <IconButton
              onClick={() => handleMenuIconClick()}
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
      </MuiAppBar>
    </Grid>
  )
}

export { AppBar }
