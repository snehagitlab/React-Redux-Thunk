import * as React from 'react';
import { useContext } from 'react';
/*  import Box from '@mui/material/Box';
 import Drawer from '@mui/material/Drawer'; 
import  Typography  from '@mui/material/Typography'; */
//import {ArrowBackIosIcon} from '@material-ui/icons/ArrowBackIos';

// interface props use for type checking
/* type Props = {
    // header is the title of the drawer
    header: string;
    // children is the content of the drawer
    children: React.ReactNode;
    // open is the state of the drawer
    open: boolean;
    // setOpen is the function to set the state of the drawer
    setOpen: (state: boolean) => void;
    // loading is the state of the loader
    loading: boolean;
} */

// functional component that renders a right drawer with a header and a back button that navigates to the previous page in the browser history
export default function SideDrawer(props) {
    // children is the content of the drawer
    // open is the state of the drawer
    // setOpen is the function to set the state of the drawer
    // loading is the state of the loader
    // header is the title of the drawer
    const { children, open, setOpen, loading, header } = props;
    //const { refreshBookingDetail } = useContext(GlobalContext)

    // header component that renders a back button and a title
    const HeaderTitle = ({ children }) => {

        // function to navigate to the previous page in the browser history
        const goBack = () => {
            window.history.back();
        }

        const title = children !== null ? children : '';

        // Return JSX
        return (
            <div
                sx={{
                    width: '100%',
                    padding: '20px',
                    position: 'sticky',
                    display: 'flex',
                    alignItems: 'center',
                    top: 0,
                    zIndex: 50,
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 10px #f0f0f0'
                }}>

{/*                 <ArrowBackIosIcon fontSize='small' onClick={goBack} style={{ marginRight: '10px', cursor: 'pointer' }} />
            */}                <p fontSize={18} fontWeight={600} color="primary" style={{ textTransform: 'capitalize' }}>
                    {title}
                </p>
            </div>
        )
    }

    // Return JSX
    return (
        <div
            anchor={"right"}
            open={open}
            onClose={() => { setOpen(false); }}
        >
            <HeaderTitle>
                {header}
            </HeaderTitle>

            <div sx={{ padding: '0px 20px 0px 20px' }}>
                {loading && <p>Loading...</p>}
                {children}
            </div>

        </div>
    );
}
