import { FavoriteBorderOutlined, HelpOutlineOutlined, LogoutOutlined, PersonOutline, SettingsOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { Button, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


const User = () => {

    const user = true;
    const navigate = useNavigate();

    const [ profileOpen, setProfileOpen ] = useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setProfileOpen((profileOpen) => !profileOpen);
      };

    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }

    setProfileOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setProfileOpen(false);
        } else if (event.key === 'Escape') {
            setProfileOpen(false);
        }
      }
    
      const prevOpen = React.useRef(profileOpen);
      React.useEffect(() => {
        if (prevOpen.current === true && profileOpen === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = profileOpen;
      }, [profileOpen]);

  return (
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={profileOpen ? 'composition-menu' : undefined}
          aria-expanded={profileOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <PersonOutline/>
        </Button>
        <Popper
          open={profileOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={profileOpen}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={() => navigate("/account")}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Wishlist<FavoriteBorderOutlined style={} /></MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}
export default User