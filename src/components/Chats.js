import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../components/firebase"

export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await auth.signOut()
        history.push("/")
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

            if (!user || user === null) {
                history.push("/")
                return
            }


            axios.get(
                'https://api.chatengine.io/users/me/', {
                    headers: {
                        "project-id": '016d621b-a1c9-4dd1-9561-04cdc577768a',
                        "user-name": user.email,
                        "user-secret": user.uid
                    }
                }
            )

            .then(() => setLoading(false))

            .catch(e => {
                let formdata = new FormData()
                formdata.append('email', user.email)
                formdata.append('username', user.email)
                formdata.append('secret', user.uid)

                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post(
                                'https://api.chatengine.io/users/',
                                formdata, { headers: { "private-key": "c156b8d8-dc0a-4614-97e8-93d5aff143ab" } }
                            )
                            .then(() => setLoading(false))
                            .catch(e => console.log('e', e.response))
                    })
            })


        }
    }, [user, history])


    if (!user || loading) return <div / >

        return ( <
            div className = 'chats-page' >
            <
            div className = 'nav-bar' >
            <
            div className = 'logo-tab' >
            Yatter <
            /div>





            <
            div onClick = { handleLogout }
            className = 'logout-tab' >
            Sign out <
            /div> <
            /div>

            <
            ChatEngine height = 'calc(100vh - 66px)'
            projectID = '016d621b-a1c9-4dd1-9561-04cdc577768a'
            userName = { user.email }
            userSecret = { user.uid }
            onNewMessage = {
                () => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play() }
            /> <
            /div>
        )
}