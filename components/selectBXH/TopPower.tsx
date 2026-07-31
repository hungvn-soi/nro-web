"use client"
import { IPlayer } from "@/types/player"
import CardBXH from "./CardBXH"
import { useEffect, useState } from "react"
import LoadingOverlay from "../LoadingOverlay"

const TopPower = () => {

    const[topPower, setTopPower] = useState<IPlayer[] | null>(null)
    const [isloading, setisLoading] = useState<boolean>(false)

    useEffect(() => {
            const loadDataTopPower = async () => {
                try {
                    setisLoading(true)
                    const res = await fetch("/api/top-server/power", {
                        cache: "no-store",
                    });
    
                    if (!res.ok) return;
    
                    setTopPower(await res.json());
                } catch (err) {
                    console.error(err);
                } finally { setisLoading(false) }
            };

        loadDataTopPower()

    }, []);

    return (
        <div className="relative w-full h-full">
            <LoadingOverlay
                show={isloading}
            />
            {
                topPower ? topPower.map( (item, index ) => (
                    <CardBXH
                        key={item.id}
                        rank={index+1}
                        img={"/assets/Card/card1.webp"}
                        useName={item.name}
                        serverName={"Server NRO"}
                        dame={item.power}
                    />
                )) : <div>Loading</div>
            }
        </div>
    )
}
export default TopPower