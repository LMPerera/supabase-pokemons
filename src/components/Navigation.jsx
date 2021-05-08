import { useContext } from "react"
import AppContext from "../AppContext";
import { useHistory } from "react-router-dom";
import { Grid, GridRow, GridColumn, Menu, MenuItem } from 'semantic-ui-react'

function Navigation({ children, supabase }) {
    const { isLoggedIn, logout } = useContext(AppContext)
    let history = useHistory();
    const logOut = () => {
        supabase.auth.signOut();
        logout();
        history.push("home")
    }
    return (
        <Grid padded="vertically">
            <GridRow stretched>
                <GridColumn width={16}>
                    <Menu fixed="top">
                        <MenuItem as="a" header onClick={() => history.push("home")}>
                            <div>Pokemon</div>
                        </MenuItem>
                        <MenuItem as="a" onClick={() => logOut()} position="right">
                            {isLoggedIn ? "Logout" : "Login"}
                        </MenuItem>
                    </Menu>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={16}>{children}</GridColumn>
            </GridRow>
        </Grid>
    )
}

export default Navigation
