// On load generate the rows of the calendar, and format them
// Generate any local storage variables which need to inside the calendar

// check once per second if the formatting needs to change

// save user input to the local storage

// initialize global variables
var calendarBody;
var calendarArr;

function onLoad () {
    // set global variable values
    calendarBody = $(".container");
    loadLocalStorage();
    genCal();
    formatTitleDay();
    formatCal();
    // get local storage variables
    // generate rows of calendar
    // format rows of calendar generate rows for hours 7 AM - 10 PM 16 hours - 16 rows
}

function genCal () {
    var newRow;
    var rowInd;
    for (let i = 0; i < 16; i++) {
        // for each row, always 16
        rowInd = "row" + i;
        newRow = $("<div>");
        newRow.attr('id', rowInd);
        newRow.addClass('row');
        var newCol;
        var colInd;
        for (let j = 0; j < 3; j++) {
            // for each of the three elements in the current row, display them.
            colInd = "col" + j;
            newCol = $("<div>");
            newCol.attr('id', colInd);
            newCol.addClass('col');
            newRow.append(newCol);
        }
        calendarBody.append(newRow);
    }
}

function formatTitleDay () {
    $('#currentDay').text(moment().format("dddd") + ", " + moment().format("MMMM, DD"));
}

function formatCal () {
    //set the color of the middle portion to be the appropriate color: gray for past, red for current, green for future
    // uses moment
    var firCol;
    var timeOffset = 7;
    var curHour = parseInt(moment().format("H"));
    for (let i = 0; i < 16; i++) {
        // for each row, insert time into the first element, 
        //insert a text if applicable into the second element, 
        //nd make the third element a button to save, add an event listener for that button
        hour = (i + timeOffset) % 12;
        hourMil = (i + timeOffset);
        var timeText
        if (hour === 0){
            timeText = hourMil + " PM";
        } else if (hour < 12 && hourMil < 12) {
            timeText = hour + " AM"
        } else {
            timeText = hour + " PM";
        }
        firCol = $(`#row${i}`).children("#col0");
        firCol.text(timeText);
        firCol.addClass("time-block");
        firCol.addClass("hour");
        secCol = $(`#row${i}`).children("#col1");
        if (hourMil < curHour) {
            secCol.addClass("past");
        } else if (hourMil === curHour) {
            secCol.addClass("present");
        } else {
            secCol.addClass("future");
        }
        secCol.removeClass("col");
        secCol.addClass("col-8");
        var input = $("<textarea>");
        input.attr('id', 'calendarInput');
        input.attr('name', 'calendarInput');
        input.text(calendarArr[i]);
        secCol.append(input);
        thrCol = $(`#row${i}`).children('#col2');
        thrCol.addClass("saveBtn");
        var icon = $("<i>");
        icon.text("SAVE");
        icon.on("click", saveData);
        thrCol.append(icon);
    }
}

function saveData (e) {
    var inputTextCont = $(e.target).parent().siblings()[1]; // selects the middle column in the same row as the button clicked
    var inputText = $.trim($(inputTextCont.children[0]).val()); // gets the text content of that middle column
    var row = $(e.target).parent().parent().attr('id').slice(3);
    calendarArr[row] = inputText;
    localStorage.setItem("calendarArr", JSON.stringify(calendarArr));

}

function loadLocalStorage () {
    if (localStorage.getItem("calendarArr")) {
        // if there already exists a calendar object, load it into a variable, if not create a blank one. 
        calendarArr = JSON.parse(localStorage.getItem("calendarArr"));
    } else {
        calendarArr = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem("calendarArr", JSON.stringify(calendarArr));
    }
}

function clearCal () {
    calendarBody.children().remove();
}

onLoad();