import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Banner = () => {
    const [description, setDescription] = useState('');
    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Minutes, setMinutes] = useState(0);
    const [Seconds, setSeconds] = useState(0);
    const [link, setLink] = useState('');
    const [endTime, setEndTime] = useState('');
    const isVisible = useSelector((state) => state.banner.isVisible);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('https://tuf-assignment-backend-rw56.onrender.com/api/get-banner-details');
                setDescription(response.data.description);
                setLink(response.data.link);
                setEndTime(response.data.timer);

                const currEndtime = response.data.timer;
                const now = moment();
                const end = moment(currEndtime);
                const diff = end.diff(now);

                if (diff > 0) {
                    const duration = moment.duration(diff);
                    setDays(Math.floor(duration.asDays()));
                    setHours(duration.hours());
                    setMinutes(duration.minutes());
                    setSeconds(duration.seconds());
                } else {
                    setDays(0);
                    setHours(0);
                    setMinutes(0);
                    setSeconds(0);
                }
            } catch (error) {
                console.error('Error fetching banner data:', error);
                return;
            }
        };
        fetchBanner();
    }, []);

    useEffect(() => {
        if (endTime) {
            const intervalId = setInterval(() => {
                const now = moment();
                const end = moment(endTime);
                const diff = end.diff(now);

                if (diff > 0) {
                    const duration = moment.duration(diff);
                    setDays(Math.floor(duration.asDays()));
                    setHours(duration.hours());
                    setMinutes(duration.minutes());
                    setSeconds(duration.seconds());
                } else {
                    setDays(0);
                    setHours(0);
                    setMinutes(0);
                    setSeconds(0);
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [endTime]);

    return (
        isVisible ? (
            <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{description}</h1>
                    <div className="flex space-x-2 md:space-x-4">
                        <div className="flex flex-col items-center bg-white text-indigo-600 font-bold p-2 md:p-4 rounded-lg shadow-lg">
                            <span className="text-2xl md:text-4xl">{Days}</span>
                            <span className="text-sm md:text-lg">Days</span>
                        </div>
                        <div className="flex flex-col items-center bg-white text-indigo-600 font-bold p-2 md:p-4 rounded-lg shadow-lg">
                            <span className="text-2xl md:text-4xl">{Hours}</span>
                            <span className="text-sm md:text-lg">Hours</span>
                        </div>
                        <div className="flex flex-col items-center bg-white text-indigo-600 font-bold p-2 md:p-4 rounded-lg shadow-lg">
                            <span className="text-2xl md:text-4xl">{Minutes}</span>
                            <span className="text-sm md:text-lg">Minutes</span>
                        </div>
                        <div className="flex flex-col items-center bg-white text-indigo-600 font-bold p-2 md:p-4 rounded-lg shadow-lg">
                            <span className="text-2xl md:text-4xl">{Seconds}</span>
                            <span className="text-sm md:text-lg">Seconds</span>
                        </div>
                    </div>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg bg-white text-indigo-600 font-semibold px-4 py-2 md:px-5 md:py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
                    Learn More
                </a>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Banner is Disabled</h2>
                <p className="text-center text-sm md:text-lg">Toggle the switch to turn on the banner and view its content.</p>
            </div>
        )
    );

}

export default Banner;
