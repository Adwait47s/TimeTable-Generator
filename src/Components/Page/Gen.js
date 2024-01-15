import React, { useState, useEffect } from 'react';

const Gen = () => {
  const [timetableData, setTimetableData] = useState({
    CNSL: { turns: 4, connected: true, isLab: true, isDone: false },
    CCL: { turns: 2, connected: true, isLab: true, isDone: false },
    DSBDAL: { turns: 2, connected: true, isLab: true, isDone: false },
    WADL: { turns: 2, connected: true, isLab: true, isDone: false },
    CC: { turns: 3, connected: false, isLab: false, isDone: false },
    CNS: { turns: 3, connected: false, isLab: false, isDone: false },
    WAD: { turns: 3, connected: false, isLab: false, isDone: false },
    DSBDA: { turns: 3, connected: false, isLab: false, isDone: false },
    Internship: { turns: 4, connected: true, isLab: false, isDone: false },
    HON: { turns: 4, connected: true, isLab: false, isDone: false },
    AUDIT_Course: { turns: 2, connected: true, isLab: false, isDone: false },
    PDA: { turns: 2, connected: true, isLab: false, isDone: false },
    CC_Activities: { turns: 2, connected: true, isLab: false, isDone: false },
  });

  const [timetableMatrix, setTimetableMatrix] = useState(Array.from({ length: 7 }, () => Array(7).fill('')));
  const [originalTimetable, setOriginalTimetable] = useState({ ...timetableData });

  useEffect(() => {
    showSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const generateTimetable = () => {
    // Your generateTimetable logic here
  };

  const resetTimetable = () => {
    setTimetableData({ ...originalTimetable });
    setTimetableMatrix(Array.from({ length: 7 }, () => Array(7).fill('')));
  };

  const showSubjects = () => {
    // Your showSubjects logic here
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Timetable Generator</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateTimetable}>
          Generate Timetable
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={resetTimetable}>
          Reset Timetable
        </button>
      </div>
      {/* Render your timetable grid */}
      <div className="grid grid-cols-7 gap-4 mt-8">
        {timetableMatrix.map((row, rowIndex) => (
          // Adjust styling as needed
          <div key={rowIndex} className="grid grid-rows-6 gap-2">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="border p-2">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Render subject list */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Remaining Subjects</h2>
        <div className="flex flex-wrap">
          {Object.entries(timetableData).map(([subject, { turns }]) => (
            turns > 0 && (
              <div key={subject} className="bg-gray-200 p-2 m-2 rounded">
                {`${subject}: ${turns}`}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gen;
