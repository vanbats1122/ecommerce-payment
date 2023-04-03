import { FavoriteBorderOutlined, PersonOutline } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, styled } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { shades } from "../../theme";

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
                    <MenuItem 
                      onClick={() => navigate("/account")}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      Profile
                    <PersonOutline 
                      sx={{
                        "&:hover": {color: shades.secondary[500] }
                    }}
                     />
                    </MenuItem>
                    <MenuItem 
                      onClick={handleClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      Wishlist
                    <FavoriteBorderOutlined
                       sx={{
                        "&:hover": {color: shades.secondary[500] }
                    }}
                    />
                    </MenuItem>
                    <MenuItem 
                      onClick={handleClose}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >Logout
                    <LogoutIcon 
                      sx={{
                        "&:hover": {color: shades.secondary[500] }
                    }}
                    />
                    </MenuItem>
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