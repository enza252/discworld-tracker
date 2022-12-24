import React from "react"

import { Divider, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'

import { Saga } from "../../types";

const drawerWidth = 240;

const sagas = [
    Saga.DEATH,
    Saga.MOIST_VON_LIPWIG,
    Saga.STANDALONES,
    Saga.THE_CITY_WATCH,
    Saga.THE_WITCHES,
    Saga.THE_WIZARDS_RINCEWIND,
    Saga.TIFFANY_ACHING_AND_NAC_MAC_FEEGLEs
]

type SidePanelProps = {
    handleOrderByClick: Function
    selected?: string
}

const SidePanel: React.FunctionComponent<SidePanelProps> = ({ handleOrderByClick, selected }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleOrderByClick()} disabled={!selected}>
                            <ListItemText primary="View by Publication Date" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                View by Saga:
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    {sagas.map((saga) => (
                        <ListItem key={saga} disablePadding>
                            <ListItemButton onClick={() => handleOrderByClick(saga)} disabled={saga === selected}>
                                <ListItemText primary={saga} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider />
                </List>
            </Drawer>
        </Box >
    )
}

export { SidePanel }