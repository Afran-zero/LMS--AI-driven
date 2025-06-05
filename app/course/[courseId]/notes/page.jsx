"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Course ID:', courseId);
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/study-type', {
                    courseId: courseId,
                    studyType: 'notes'
                });

                console.log("Full API response:", response.data);
                
                const notesData = Array.isArray(response.data?.data) ? response.data.data : [];
                
                if (!Array.isArray(notesData)) {
                    console.error("Unexpected data format:", response.data);
                    setNotes([]);
                    return;
                }

                console.log("Notes data to display:", notesData);
                setNotes(notesData);
                
            } catch (error) {
                console.error('Error fetching notes:', error);
                setNotes([]);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchNotes();
        } else {
            console.error('No courseId provided');
            setLoading(false);
        }
    }, [courseId]);

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleNext = () => {
        if (currentStep < notes.length - 1) setCurrentStep(currentStep + 1);
    };

    // Define an array of background colors for dynamic chapter styling
    const chapterColors = [
        'bg-blue-50',
        'bg-green-50',
        'bg-yellow-50',
        'bg-red-50',
        'bg-purple-50',
        'bg-indigo-50',
        'bg-pink-50',
        'bg-teal-50',
        'bg-orange-50',
        'bg-cyan-50',
    ];

    // Calculate the chapter index for color (handle non-numeric chapterId)
    const getChapterColor = (chapterId) => {
        const chapterIndex = parseInt(chapterId, 10) || 0;
        return chapterColors[chapterIndex % chapterColors.length];
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading notes...</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {notes.length === 0 ? (
                <div className="text-center text-gray-500">
                    No notes available for this course. Course ID: {courseId}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-8">
                    {/* Navigation Buttons at Top */}
                    <div className="flex justify-between w-full max-w-3xl mb-6">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors text-lg font-medium"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentStep === notes.length - 1}
                            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors text-lg font-medium"
                        >
                            Next
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md">
                        <div className="text-center mb-3">
                            <span className="text-base font-medium text-gray-700">
                                Progress: {currentStep + 1} / {notes.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / notes.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex gap-3">
                        {notes.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`h-4 w-4 rounded-full transition-all
                                ${index === currentStep ? 'bg-blue-600 scale-125' : 'bg-gray-300'}
                                ${index < currentStep ? 'bg-blue-400' : ''}`}
                                aria-label={`Go to note ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* HTML Viewer */}
                    <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                            {notes[currentStep]?.title || `Note ${currentStep + 1}`}
                        </h3>
                        <div
                            className={`prose prose-lg max-w-none
                                ${getChapterColor(notes[currentStep]?.chapterId)}
                                p-6 rounded-lg leading-relaxed
                                [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-8 [&_li]:mb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3`}
                            dangerouslySetInnerHTML={{ __html: notes[currentStep]?.content || 'No content available' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewNotes;