import { TwitterFollowCard } from "./components/TwitterFollowCard"

export function App() {
    const format = (userName) => `@${userName}`;

    const users = [
        { userName: "ZapataF", name: "Juan Jose Zapata", initialIsFollowing: false },
        { userName: "Midudev", name: "Miguel Angel", initialIsFollowing: true },
        { userName: "ibaiLlanos", name: "Ibai Llanos", initialIsFollowing: true },
        { userName: "illojuan", name: "Juan Alberto", initialIsFollowing: false }
    ];

    return (
        <section className="App">

            {
                users.map(({ userName, name, initialIsFollowing }) => {
                    return (
                        <TwitterFollowCard
                            key={userName}
                            formatUserName={format}
                            userName={userName}
                            name={name}
                            initialIsFollowing={initialIsFollowing} />
                    )
                })
            }
        </section>
    )
}