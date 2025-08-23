// import { Box, MenuItem, MenuList, Modal } from '@mui/material';
// import React, { useEffect } from 'react'
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import { useNavigate } from 'react-router';
// import { Hub } from 'aws-amplify/utils';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'rgb(20, 23, 32)',
//   border: '2px solid #000',
//   color: 'white',
//   boxShadow: 24,
//   p: 4,
// };

// interface AccountMenuProps {
//   isOpen : boolean;
// }

const AccountMenu = () => {

  // const navigate = useNavigate();

  // function handleLogin() {
  //   navigate("/login");
  // }

  // useEffect(() => {
  //   Hub.listen('auth', ({ payload }) => {
  //     switch (payload.event) {
  //       case 'signedIn':
  //         console.log('user have been signedIn successfully.');
  //         navigate("/")
  //         break;
  //     }
  //   });
  // }, []);

  return (
    <>
      {/* {props.isOpen && (
        <Modal
          open={props.isOpen}
        >
          <Box sx={style}>
            <h2>Account</h2>
            <MenuList sx={{bgcolor: 'rgb(10, 13, 22)', mt: '5px'}}>
              {
                route !== 'authenticated' ?  (
                  <MenuItem onClick={handleLogin}>Login</MenuItem> 
                )
                :
                (
                  <div>
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                    <MenuItem>Save</MenuItem>
                  </div>
                )
              }
            </MenuList>
          </Box>
        </Modal>
    
      )} */}
    </>
  );
};

export default AccountMenu