
import { createContext,useState,useEffect } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = props =>{


    const [user , setUser] = useState({});
    
    useEffect(async () => {
        const result = await fetch("/api/db/user", { method: "GET" });
        if(result.status  === 400)
        {
            setUser(null);
            //return;
        }
        else
        {
            const data = await result.json();
            const user = {
                    email  : data.email,
                    role   : data.role,
                    name   : data.name }

                  
            setUser(user)
        }
      },[]);
 

    return(
        <AuthContext.Provider value={[user]}>
            {props.children}
        </AuthContext.Provider>)
}




// class AuthContextProvider extends React.Component {

//     isAuth = {
//         msg : 'hello'
//     }

//     async componentDidMount()
//     {
//         const result = await fetch("/api/db/user", { method: "GET" });
//         const data = await result.json();
//         console.log("1",data);
//     }

//     render()
//     {
//         console.log(this.isAuth);
//         return(
//             <AuthContext.Provider value={{...this.isAuth}}>
//                 {this.props.children}
//             </AuthContext.Provider>)
//     }
// }

// export default AuthContextProvider;