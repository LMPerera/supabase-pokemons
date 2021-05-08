import { useState, useEffect, useContext } from "react"
import AppContext from "../AppContext";
import { useHistory } from "react-router-dom";
import { Grid, GridColumn, GridRow, Form, FormField, Input, Icon, Button, Header, Segment } from "semantic-ui-react"

const initState = { email: '', password: '', passwordConfirm: '' }

function Login({ supabase }) {
    let history = useHistory();
    const [isSignIn, setSignIn] = useState(false);
    const [credentials, setCredentials] = useState(initState);
    const { user, isLoggedIn, login, logout } = useContext(AppContext)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                login(session.user)
            }
        );
        return () => {
            authListener?.unsubscribe();
        };
    }, [user]);

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/home");
        }
    }, [isLoggedIn])

    const onChange = (type, value) => {
        setCredentials({ ...credentials, [type]: value })
    }

    const clear = () => {
        setCredentials(initState)
    }

    const signIn = async () => {
        await supabase.auth.signIn({ email: credentials.email, password: credentials.password });
        clear();
    }

    const signUp = async () => {
        await supabase.auth.signUp({ email: credentials.email, password: credentials.password })
        clear();
    }

    const gitHub = async () => {
        await supabase.auth.signIn({
            provider: 'github'
        })
    }


    const google = async () => {
        await supabase.auth.signIn({
            provider: 'google'
        })
    }

    return (
        <Grid padded>
            <GridRow>
                <GridColumn width={5}></GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}></GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={5}></GridColumn>
                <GridColumn width={6}>
                    <Segment>
                        <Form>
                            <FormField>
                                <Header as="h5">Email</Header>
                                <Input placeholder="Email" value={credentials.email} onChange={(e, { value }) => onChange('email', value)}></Input>
                            </FormField>
                            <FormField>
                                <Header as="h5">Password</Header>
                                <Input placeholder="Password" value={credentials.password} onChange={(e, { value }) => onChange('password', value)}></Input>
                            </FormField>
                            {isSignIn ?
                                <FormField>
                                    <Header as="h5">Confirm Password</Header>
                                    <Input placeholder="Password" value={credentials.passwordConfirm} onChange={(e, { value }) => onChange('passwordConfirm', value)}></Input>
                                </FormField>
                                : null}
                            <FormField>
                                <Button onClick={() => isSignIn ? setSignIn(false) : signIn()}>Login</Button>
                                <Button onClick={() => isSignIn ? signUp() : setSignIn(true)}>SignIn</Button>
                            </FormField>
                        </Form>
                    </Segment>
                    <Segment>
                        <Grid>
                            <GridRow>
                                <GridColumn width={8}>
                                    <Button icon labelPosition='left' fluid onClick={gitHub}>
                                        <Icon name='github' />
                                        Github
                                    </Button>
                                </GridColumn>
                                <GridColumn width={8}>
                                    <Button icon labelPosition='left' fluid onClick={google}>
                                        <Icon name='google' />
                                        Google
                                    </Button>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Segment>
                </GridColumn>
                <GridColumn width={5}></GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={5}></GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}></GridColumn>
            </GridRow>
        </Grid>
    )
}

export default Login
