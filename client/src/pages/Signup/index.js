import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import FormHead from '../../components/FormHead';
import Field from '../../components/Field';
import PageSwitcher from '../../components/PageSwitcher';
import Error from '../../components/Error';

import { SIGNUP_MUTATION } from '../../queries/signup';
import { goBack, setToken, getToken, displayError } from '../../utils';

const Signup = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const _saveUser = token => setToken(token);
    const _confirm = data => {
        const { token } = data.signup;
        _saveUser(token);

        goBack(history, '/');
    };

    if (getToken()) return goBack(history, '/');

    return (
        <div className="login full-height flex flex-column center">
            <div className="half pd-16">
                <FormHead
                    title="Signup"
                    subTitle="Enter you data down below"
                />

                <Field
                    name="name"
                    type="text"
                    required={true}
                    val={name}
                    setter={setName}
                    placeholder={`Your username here`}
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
                    mutation={SIGNUP_MUTATION}
                    variables={{name, email, password}}
                    onCompleted={data => _confirm(data)}
                    onError={({graphQLErrors}) => displayError(graphQLErrors, setError)}>
                    {
                        mutation => (
                            <button
                                className="button full pd-16"
                                onClick={mutation}>
                                Signup
                            </button>
                        )
                    }
                </Mutation>

                <PageSwitcher
                    to="/login"
                    text="Don't have an account! "
                    label="Login"
                />
            </div>

            {error && <Error message={error} />}
        </div>
    );
};

export default Signup;
