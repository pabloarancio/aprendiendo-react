import React from "react"
import "./App.css"
import { TwitterFollowCard } from "./TwitterFollowCard"

const users = [
    {
        userName: 'midudev',
        children: 'Miguel',
        isFollowing: true
    },
    {
        userName: 'pablo_arancio',
        children: 'Pablo',
        isFollowing: true
    }
]

export function  App() {   
    
    return (
        <section className="App">
            {
                users.map(({userName, children, isFollowing}) => (                   
                    <TwitterFollowCard
                         key={userName}
                         userName={userName}
                          initialIsFollowing={isFollowing}
                     >
                         {children}   
                     </TwitterFollowCard>
                    ))                    
                })            
        </section>
    )
} 