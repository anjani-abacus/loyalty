import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, MoreVertical } from 'lucide-react';
import Container from '../../components/ui/container';
import { DetailHeader } from '../../layouts/DataTable/Header';

export default function TutorialVideos() {
    const [hoveredId, setHoveredId] = useState(null);
    const [playingId, setPlayingId] = useState(null);

    const tutorials = [
        {
            id: 1,
            title: "How to check points summary",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 2,
            title: "Registration Approval",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 3,
            title: "How to take action on support tickets  ? to take action on support tickets      ",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 4,
            title: "How to manage referral point master",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 5,
            title: "How to create system users",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 6,
            title: "How to create point categories",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 7,
            title: "How to create bonus scheme",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        },
        {
            id: 8,
            title: "How to check redemption request",
            thumbnail: "BASIQ/360",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

        }
    ];

    const handlePlayClick = (e, tutorialId) => {
        e.preventDefault();
        setPlayingId(tutorialId);
    };

    const truncateTitle = (title, wordLimit = 10) => {
        const words = title.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : title;
    };

    return (


        <Container >
            <DetailHeader pageTitle="Basiq360 Video-Tutorial " />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-3">
                {tutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        onMouseEnter={() => setHoveredId(tutorial.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {playingId === tutorial.id ? (

                            <div className="relative aspect-video bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src={`${tutorial.videoUrl}?autoplay=1`}
                                    title={tutorial.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <button
                                    onClick={() => setPlayingId(null)}
                                    className="absolute top-2 right-2 bg-background bg-opacity-60 text-foreground px-3 py-1 rounded text-sm hover:bg-opacity-80"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            // Thumbnail view
                            <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 aspect-video flex items-center justify-center group cursor-pointer">
                                {/* Video Content */}
                                <div className="text-center relative z-10">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-white font-bold text-2xl">BASIQ</span>
                                        <span className="text-orange-500 font-bold text-2xl">/</span>
                                        <span className="text-white font-bold text-2xl">360</span>
                                        <span className="text-orange-500 text-xl">°</span>
                                    </div>

                                    <button
                                        onClick={(e) => handlePlayClick(e, tutorial.id)}
                                        className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all inline-block"
                                    >
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </button>
                                </div>

                                {/* Video Controls Overlay - Shows on hover */}
                                {hoveredId === tutorial.id && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 z-20">
                                        {/* Control Bar */}
                                        <div className="space-y-2">
                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-600/50 h-1 rounded-full">
                                                <div className="bg-red-600 h-1 rounded-full" style={{ width: '0%' }}></div>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center justify-between text-foreground">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => handlePlayClick(e, tutorial.id)}
                                                        className="hover:scale-110 transition-transform"
                                                    >
                                                        <Play className="w-5 h-5 fill-white" />
                                                    </button>
                                                    <button className="hover:scale-110 transition-transform">
                                                        <Volume2 className="w-5 h-5" />
                                                    </button>

                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button className="hover:scale-110 transition-transform">
                                                        <Maximize className="w-4 h-4" />
                                                    </button>
                                                    <button className="hover:scale-110 transition-transform">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                        )}

                        <div className="p-4 ">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Description:</span> {truncateTitle(tutorial.title)}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </Container>

    );
}