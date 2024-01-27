import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableSubject = ({ subject, turns ,connected}) => {
  const [, drag] = useDrag({
    type: 'SUBJECT',
    item: { subject, turns,connected },
    canDrag: () => turns > 0, // Allow drag only if turns are greater than 0
  });

  return (
    <div
    ref={drag}
    key={subject}
    className={`bg-blue-200 p-2 m-2 rounded ${turns <= 0 ? 'disabled' : ''}`}
    style={{ border: turns <= 0 ? '2px solid red' : '2px solid green' }}
  >
    {`${subject}: ${turns}`}
  </div>
  );
};

const TimetableCell = ({ rowIndex, colIndex, onDrop, content }) => {
  const [, drop] = useDrop({
    accept: 'SUBJECT',
    drop: (item) => onDrop(item, rowIndex, colIndex),
  });

  return (
    <div ref={drop} className="border p-2">
      {content && <div>{content}</div>}
    </div>
  );
};


const Gen = () => {
  const initialTimetableData = {
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
  };

  const [timetableData, setTimetableData] = useState({ ...initialTimetableData });
  const [timetableMatrix, setTimetableMatrix] = useState(Array.from({ length: 7 }, () => Array(7).fill('')));

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:15-12:15', '12:15-1:15', '2:00-3:00', '3:00-4:00'];

  for (var i = 1; i < 7; i++) {
    timetableMatrix[i][0] = daysOfWeek[i - 1];
    timetableMatrix[0][i] = timeSlots[i - 1];
  }

  useEffect(() => {
    // Your showSubjects logic here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateTimetable = () => {
    // Initialization
    const newTimetableMatrix = Array.from({ length: 7 }, () => Array(7).fill(''));

    // Filling the timetable matrix
    for (var i = 0; i < 7; i++) {
      let labdone = 0;
      if (i !== 0) {
        newTimetableMatrix[i][0] = daysOfWeek[i - 1];
      }
      for (var j = 1; j <= 6; j++) {
        if (i === 0) {
          newTimetableMatrix[i][j] = timeSlots[j - 1];
          continue;
        }

        if (timetableMatrix[i][j]) {
          newTimetableMatrix[i][j] = timetableMatrix[i][j];
          continue;
        }

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
            newTimetableMatrix[i][j + 1] = subject;
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
            newTimetableMatrix[i][j + 1] = subject;
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
    setTimetableData({ ...initialTimetableData });
    // Reset the timetable matrix
    const newTimetableMatrix = Array.from({ length: 7 }, () => Array(7).fill(''));
    setTimetableMatrix(newTimetableMatrix);
  };

  const handleDrop = (item, rowIndex, colIndex) => {
    // Handle the drop event and update the timetableMatrix
    const { subject, turns,connected } = item;
    // Update the timetableMatrix at the dropped position
    setTimetableMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];

      if(connected){
        if((colIndex&1)){
          newMatrix[rowIndex][colIndex] = `${subject}`;
          newMatrix[rowIndex][colIndex+1] = `${subject}`;
          setTimetableData((prevData) => ({
            ...prevData,
            [subject]: {
              ...prevData[subject],
              turns: prevData[subject].turns - 2,
            },
          }));
          return newMatrix;
        }
        else{
          alert("Can't place a lab lecture there !");
          return newMatrix;
        }
      }
      newMatrix[rowIndex][colIndex] = `${subject}`;
      setTimetableData((prevData) => ({
        ...prevData,
        [subject]: {
          ...prevData[subject],
          turns: prevData[subject].turns - 1,
        },
      }));
      return newMatrix;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Timetable Generator</h1>
        <div className="grid grid-cols-7 gap-4 mt-2">
          {timetableMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-rows-7 gap-2">
              {row.map((cell, colIndex) => (
                <TimetableCell
                  key={colIndex}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  onDrop={handleDrop}
                  content={cell}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateTimetable}>
            Generate Timetable
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={resetTimetable}>
            Reset Timetable
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Remaining Subjects</h2>
          <div className="flex flex-wrap">
            {Object.entries(timetableData).map(([subject, { turns,connected }]) => (
              <DraggableSubject key={subject} subject={subject} turns={turns} connected={connected}/>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Gen;
