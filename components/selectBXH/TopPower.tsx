"use client"
import { IPlayer } from "@/types/player"
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

interface IProp{
    dataPlayerTopPower: IPlayer[]
}

const TopPower = ({ dataPlayerTopPower }: IProp) => {
    return (
        <div>
            {
                dataPlayerTopPower.map( (item, index ) => (
                    <CardBXH
                        key={item.id}
                        rank={index+1}
                        img={"/assets/Card/card1.webp"}
                        useName={item.name}
                        serverName={"Server NRO"}
                        dame={item.power}
                    />
                ))
            }
        </div>
    )
}
export default TopPower