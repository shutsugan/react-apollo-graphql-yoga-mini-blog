import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Field from '../../components/Field';
import Error from '../../components/Error';
import FormHead from '../../components/FormHead';
import PageSwitcher from '../../components/PageSwitcher';

import { LOGIN_MUTATION } from '../../queries/login';
import { goBack, setToken, getToken } from '../../utils';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    const _confirm = data => {
        const { token } = data.login;
        _saveUser(token);
        
        goBack(history, '/');
    };
    
    const _saveUser = token => setToken(token);
    const _displayError = error => setError(error[0].message);

    if (getToken()) return goBack(history, '/');

    return (
        <div className="login full-height flex flex-column center">
            <div className="half pd-16">
                <FormHead 
                    title="Login" 
                    subTitle="Enter your details below."
                />
                
                <Field
                    name="email"
                    type="email"
                    required={true}
                    pattern={/\S+@\S+\.\S+/}
                    pattern_message={`Invalid Email`}
                    val={email}
                    setter={setEmail}
                    placeholder="Personal Email"
                />

                <Field 
                    name="password"
                    type="password"
                    required={true}
                    val={password}
                    setter={setPassword}
                    placeholder={`Your password here`}
                />

                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{ email, password }}
                    onCompleted={data => _confirm(data)}
                    onError={({ graphQLErrors }) => _displayError(graphQLErrors)}>
                    {
                        mutation => (
                            <button
                                className="button full pd-16"
                                onClick={mutation}>
                                Login
                            </button>
                        )
                    }
                </Mutation>

                <PageSwitcher
                    to="/signup"
                    label="Signup"
                    text="If new user! "
                />
            </div>

            {error && <Error message={error} />}
        </div>
    );
};

export default Login;