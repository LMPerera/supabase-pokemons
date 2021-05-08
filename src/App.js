import { useContext } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AppContext from "./AppContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigation from "./components/Navigation"

function App({ supabase }) {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Redirect to="/home" {...props} />}
        />
        <Route
          exact
          path="/home"
          render={(props) => (
            <PrivateRoute component={Home}
              supabase={supabase}
              isLoggedIn={isLoggedIn} {...props} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <PublicRoute component={Login}
              supabase={supabase}
              isLoggedIn={isLoggedIn} {...props} />
          )}
        />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, supabase: supabase, isLoggedIn: isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Navigation supabase={supabase}>
          <Component {...props} supabase={supabase} />
        </Navigation>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, supabase: supabase, isLoggedIn: isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn ? (
        <Component {...props} supabase={supabase} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      )
    }
  />
);



export default App;
