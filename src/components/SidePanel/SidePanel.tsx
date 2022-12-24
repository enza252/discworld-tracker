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


const SidePanel: React.FunctionComponent = () => {
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
                    <ListItem>
                        <ListItemText>
                            View by Publication Order
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            View by Saga:
                        </ListItemText>
                    </ListItem>
                    {sagas.map((saga) => (
                        <ListItem key={saga} disablePadding>
                            <ListItemButton>
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