import React from "react";

function ChapterList({ COURSE }) {
  const chapters = COURSE?.courseLayout?.chapters || [];
  
  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-5">
        <h2 className="font-medium text-xl">Chapters</h2>
        <p className="text-gray-500 mt-2">No chapters available yet</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl mb-4">Chapters</h2>
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div 
            key={index}
            className="flex flex-col gap-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{chapter.emoji || '📖'}</span>
              <div>
                <h3 className="font-medium text-lg">{chapter.chapterTitle}</h3>
                <p className="text-gray-600 mt-1">{chapter.summary}</p>
              </div>
            </div>
            
            {chapter.topics && chapter.topics.length > 0 && (
              <div className="mt-3 pl-9">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Topics covered:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {chapter.topics.map((topic, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;