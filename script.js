var tabButtons = document.querySelectorAll(".menu .buttonContainer button");
var tabPanels = document.querySelectorAll(".tabPanel");

// Data structure for storing subjects and their remaining turns
var timetableData = {
    CNSL: { turns: 4, connected: true, isLab: true, isDone: false },
    CCL: { turns: 2, connected: true, isLab: true, isDone: false },
    DSBDAL: { turns: 2, connected: true, isLab: true, isDone: false },
    WADL: { turns: 2, connected: true, isLab: true, isDone: false },
    CC: { turns: 3, connected: false, isLab: false, isDone: false },
    CNS: { turns: 3, connected: false, isLab: false, isDone: false },
    WAD: { turns: 3, connected: false, isLab: false, isDone: false },
    DSBDA: { turns: 3, connected: false, isLab: false, isDone: false },
    HON: { turns: 4, connected: true, isLab: false, isDone: false },
    Internship: { turns: 4, connected: true, isLab: false, isDone: false },
    AUDIT_Course: { turns: 2, connected: true, isLab: false, isDone: false },
    PDA: { turns: 2, connected: true, isLab: false, isDone: false },
    CC_Activities: { turns: 2, connected: true, isLab: false, isDone: false },
    
};

var timetableMatrix = [];
var original_timetable = timetableData;

function showPanel(panelIndex) {
    tabButtons.forEach(function (node) {
        node.style.backgroundColor = "";
        node.style.color = "";
    });
    tabButtons[panelIndex].style.color = "black";
    tabButtons[panelIndex].style.backgroundColor = "#eee";
    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "block";
}

function generateTimetable() {
    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    

    // Initialization
    for (var i = 0; i < 7; i++) {
        var row = [];

        for (var j = 0; j < 7; j++) {
            row.push('');
        }

        timetableMatrix.push(row);
    }
    console.log(timetableMatrix);

    // Filling the timetable matrix
    
    for(var i =0;i<7;i++){

        var labdone = 0;

        for(var j =0;j<6;j++){
            
            for(var k in timetableData){
                var subject = k;
                console.log(subject);
                var subjectTurns = timetableData[subject].turns;
                var connected = timetableData[subject].connected;
                var labb = timetableData[subject].isLab;
                var donee = timetableData[subject].isDone;
                console.log(subjectTurns, connected);
                if(donee){
                    continue;
                }
                if(labb && labdone){
                    continue;
                }
                if(subjectTurns==0){
                    continue;
                }
                if(labb && subjectTurns>0){
                    timetableMatrix[j][i] = { subject };
                    timetableMatrix[j+1][i] = { subject };
                    j++;
                    timetableData[subject].turns -=2;
                    labdone=1;
                    timetableData[subject].isDone = true;
                    break;
                }
                if(connected && (j&1)){
                    continue;
                }
                else if(connected){
                    timetableMatrix[j][i] = { subject };
                    timetableMatrix[j+1][i] = { subject };
                    j++;
                    timetableData[subject].turns -=2;
                    timetableData[subject].isDone = true;
                    break;
                }
                else{
                    timetableMatrix[j][i] = { subject };
                    timetableData[subject].turns -=1;
                    timetableData[subject].isDone = true;
                    break;
                }
            }
        }
        for(var k in timetableData){
            var subject = k;
            timetableData[subject].isDone = false;

        }
        console.log(timetableMatrix);
    }

    // Display timetable matrix in the HTML table
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            var cellId = 'slot' + (i + 1) + '-' + (j + 1);
            var cell = document.getElementById(cellId);
            var cellContent = timetableMatrix[i][j] ? timetableMatrix[i][j].subject : '';
            var isLab = timetableMatrix[i][j] && timetableMatrix[i][j].lab;
    
            if (cell) {
                cell.textContent = cellContent;
            } else {
                console.error('Cell with ID ' + cellId + ' not found.');
            }
        }
    }
    
}

function resetTimetable(){
    timetableData = original_timetable;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            var cellId = 'slot' + (i + 1) + '-' + (j + 1);
            var cell = document.getElementById(cellId);
    
            if (cell) {
                cell.textContent = '';
            } else {
                console.error('Cell with ID ' + cellId + ' not found.');
            }
        }
    }
}


function showSubjects() {
    var subjectListContainer = document.getElementById('subjectList');
    subjectListContainer.innerHTML = '';

    for (var subject in timetableData) {
        var remainingTurns = timetableData[subject].turns;

        if (remainingTurns > 0) {
            var subjectElement = document.createElement('div');
            subjectElement.classList.add('subject');
            subjectElement.textContent = `${subject}:${remainingTurns}`;
            subjectElement.draggable = true;

            subjectElement.addEventListener('dragstart', function (event) {
                event.dataTransfer.setData('text/plain', subject);
            });

            //subjectElement.textContent = subject;
            subjectListContainer.appendChild(subjectElement);
        }
    }
}
showSubjects();

showPanel(0);
