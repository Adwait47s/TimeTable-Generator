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
    // Your showSubjects logic here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateTimetable = () => {
    // Initialization
    const newTimetableMatrix = Array.from({ length: 7 }, () => Array(7).fill(''));

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeSlots = ['9:00-10:00', '10:00-11:00', '11:15-12:15', '12:15-1:15', '2:00-3:00', '3:00-4:00'];
    
    // Filling the timetable matrix
    for (var i = 0; i < 7; i++) {
      let labdone = 0;
      if(i!==0){
        newTimetableMatrix[i][0] = daysOfWeek[i-1];
      }
      for (var j = 1; j <= 6; j++) {
        if(i===0){
          newTimetableMatrix[i][j] = timeSlots[j-1];
          continue;
        }
        
        console.log(i,j);
        for (var subject in timetableData) {
          const subjectTurns = timetableData[subject].turns;
          const connected = timetableData[subject].connected;
          const labb = timetableData[subject].isLab;
          const donee = timetableData[subject].isDone;

          if (donee) {
            continue;
          }
          if (labb && labdone) {
            continue;
          }
          if (subjectTurns === 0) {
            continue;
          }
          if (labb && subjectTurns > 0) {
            newTimetableMatrix[i][j] = subject;
            newTimetableMatrix[i ][j+1] = subject;
            j++;
            timetableData[subject].turns -= 2;
            labdone = 1;
            timetableData[subject].isDone = true;
            break;
          }
          if (connected && !(j & 1)) {
            continue;
          } else if (connected) {
            newTimetableMatrix[i][j] = subject;
            newTimetableMatrix[i][j+1] = subject;
            j++;
            timetableData[subject].turns -= 2;
            timetableData[subject].isDone = true;
            break;
          } else {
            newTimetableMatrix[i][j] = subject;
            timetableData[subject].turns -= 1;
            timetableData[subject].isDone = true;
            break;
          }
        }
        console.log(i,j);
      }

      // Reset isDone after each day
      for (let subject in timetableData) {
        timetableData[subject].isDone = false;
      }
    }

    // Update the state with the new timetable matrix
    setTimetableMatrix(newTimetableMatrix);
  };

  const resetTimetable = () => {
    setTimetableData({ ...originalTimetable });
    console.log(originalTimetable);
    console.log(timetableData);
    // Reset the timetable matrix
    const newTimetableMatrix = Array.from({ length: 7 }, () => Array(7).fill(''));
    setTimetableMatrix(newTimetableMatrix);
  };
  
  const showSubjects = () => {
    // Your showSubjects logic here
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Timetable Generator</h1>
     
      {/* Days row */}
      
      {/* Time slots and timetable grid */}
      <div className="grid grid-cols-7 gap-4 mt-2">
        
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
      <div className="flex space-x-4 mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateTimetable}>
          Generate Timetable
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={resetTimetable}>
          Reset Timetable
        </button>
      </div>
      {/* Render subject list */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Remaining Subjects</h2>
        <div className="flex flex-wrap">
          {Object.entries(timetableData).map(([subject, { turns }]) => (
             (
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
