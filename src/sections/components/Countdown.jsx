import React, { useState, useEffect } from 'react';
import "../stylesheets/Countdown.css";

function Countdown() {
    const calculateTimeLeft = () => {
        const hackathonDate = new Date('October 5, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const difference = hackathonDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
                days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown">
            <div className='top'>paradise</div> {/* Text above countdown */}
            {Object.keys(timeLeft).length > 0 ? (
                <div>
                    {Object.keys(timeLeft).map((interval, index) => (
                        <span key={index}>
                            {timeLeft[interval]} {interval}{" "}
                        </span>
                    ))}
                </div>
            ) : (
                <span>Time's up!</span>
            )}
            <div className='bottom'>october 5-6th, 245 beacon st</div> {/* Text below countdown */}
        </div>
    );
}

export default Countdown;
