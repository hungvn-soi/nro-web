import CardBXH from "./CardBXH"

const data = [
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật",
        serverName: "Server NRO",
        dame: "500.000.000",
        
    },
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật 2",
        serverName: "Server NRO",
        dame: "500.000.000",
    },
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật 3",
        serverName: "Server NRO",
        dame: "500.000.000",
    },
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật 4",
        serverName: "Server NRO",
        dame: "500.000.000",
    },
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật 5",
        serverName: "Server NRO",
        dame: "500.000.000",
    },
    {
        img: "/assets/Card/card1.webp",
        useName: "Tên nhân vật 6",
        serverName: "Server NRO",
        dame: "500.000.000",
    },
]

const TopPower = () => {
    return (
        <div>
            {
                data.map( (item, index ) => (
                    <CardBXH
                        key={index}
                        rank={index+1}
                        img={item.img}
                        useName={item.useName}
                        serverName={item.serverName}
                        dame={item.dame}
                    />
                ))
            }
        </div>
    )
}
export default TopPower