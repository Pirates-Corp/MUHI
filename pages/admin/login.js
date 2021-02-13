import React from 'react';
import LoginForm from '../../components/admin/Login';


const Login = () => {
    const [loading, setLoading] = React.useState(false)

    return(
        <div>
            <LoginForm 
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    )
}

export default Login