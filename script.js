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
    var timetableMatrix = [];

    // Initialize the timetable matrix
    for (var i = 0; i < 7; i++) {
        var row = [];

        for (var j = 0; j < 7; j++) {
            row.push('');
        }

        timetableMatrix.push(row);
    }
    console.log(timetableMatrix);

    // Fill the timetable matrix
    
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
    //}
    // for (var i = 0; i < daysOfWeek.length; i++) {
    //     var colIndex = 1; // Start from the second column

    //     for (var subject in timetableData) {
    //         var subjectTurns = timetableData[subject].turns;
    //         var connected = timetableData[subject].connected;

    //         if (subjectTurns > 0) {
    //             var colspan = connected ? subjectTurns * 2 : subjectTurns;

    //             timetableMatrix[i][colIndex] = { subject: subject, colspan: colspan };
    //             timetableData[subject].turns--;

    //             // If connected, skip the next iteration as the next cell is part of the same subject
    //             if (connected) colIndex += colspan;
    //             else colIndex++;
    //         }
    //     }
    // }

    // Update the HTML table with timetableMatrix data
    




showPanel(0);
