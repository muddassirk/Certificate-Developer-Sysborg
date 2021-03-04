import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
    const [data, setData] = useState({
        user: null,
        role : null,
        darkTheme: true,
        loginStatus: false,
        anythingElse: null
    })

    useEffect(() => {

        axios({
            method: "get",
            url: 'http://localhost:5000/profile',
            withCredentials: true
        })
            .then(function (response) {
                // handle success
                console.log("response: ", response.status);
                if (response.status === 200) {
                    setData(prev => ({ ...prev, loginStatus: true ,user: response.data.profile, role: response.data.profile.role}))
                }
            })
            .catch(function (error) {
                // handle error
                console.log("global error: ==== ", error);
                if (error && error.response && error.response.status) {
                    console.log("global error ==============> ", error.response.status);
                    setData(prev => ({ ...prev, loginStatus: false,user: null, role: null }))
                }
            })

        return () => {
            console.log("cleanup")
        }
    }, [])



   

    return (
        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
} 























// import React, {useState , useContext} from 'react';

// const GlobleStateContext = React.createContext()
// const GlobleStateUpdateContext = React.createContext()

// export const useGlobleState = () => useContext(GlobleStateContext)
// export const useGlobleStateUpdate = () => useContext(GlobleStateUpdateContext)


// export function GlobleStateProvider({children}){
//     const [data , setData] = useState({
//         user: null,
//         darkTheme: true
//     })

//     return(
//         <GlobleStateContext.Provider value={data}>
//             <GlobleStateUpdateContext.Provider value={setData}>
//                 {children}
//             </GlobleStateUpdateContext.Provider>
//         </GlobleStateContext.Provider>
//     )
// }
