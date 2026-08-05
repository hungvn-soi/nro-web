"use client"
import { useEffect, useState } from "react";

interface CountdownProps {
    expiredAt: string;
    onExpired?: () => void;
}

export default function Countdown({
    expiredAt,
    onExpired,
}: CountdownProps) {
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const target = new Date(expiredAt).getTime();

        const update = () => {
            const diff = target - Date.now();

            if (diff <= 0) {
                setRemaining(0);
                onExpired?.();
                return false;
            }

            setRemaining(diff);
            return true;
        };

        update();

        const timer = setInterval(() => {
            if (!update()) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiredAt, onExpired]);

    const totalSeconds = Math.floor(remaining / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        <span>
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </span>
    );
}