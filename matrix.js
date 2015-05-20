
var oldRows = 0;
var oldCols = 0;


// Used on the initial matrix creation only.  All future ones are with changeMatrix.
function createMatrix(){
    document.getElementById("tableMatrix").style.visibility="hidden";
    document.getElementById("tableMatrix").style.opacity=0;
    var rows, cols, min, max, matrixTable, matrixHtml, i, j;
    rows = document.getElementById("inputRows").value;
    cols = document.getElementById("inputCols").value;
    min = document.getElementById("inputMin").value;
    max = document.getElementById("inputMax").value;
    matrixTable = document.getElementById("tableMatrix");
    if(!validateInputs(rows, cols, min, max)){
        // do nothing
    }
    else{
        // Turn everything into a number.
        //rows = rows - 0;
        //cols = cols - 0;
        //min = min - 0;
        //max = max - 0;
        //matrixHtml = "";
        //for(i = 0; i < rows; ++i){
        //    matrixHtml += "<tr>";
        //    for(j = 0; j < cols; ++j){
        //        matrixHtml += "<td>";
        //        matrixHtml += ("" + Math.floor((Math.random() * (max-min+1)) + min));
        //        matrixHtml += "</td>";
        //    }
        //    matrixHtml += "</tr>";
        //}
        matrixTable.innerHTML = getMatrixNumbers(rows, cols, min, max);//matrixHtml;
        //document.title="A simple " + rows + "-by-" + cols + " matrix";
        //document.getElementById("divForm").className = "hidden";
        document.getElementById("divMatrix").className = "";
        //var items = document.getElementsByClassName("divCenterRow");
        //var newHeight = (rows*2.2) + "em";
        //var newWidth = (cols*2.6) + "em";
        //items[0].style.height=newHeight;
        //items[1].style.height=newHeight;
        //items[2].style.height=newHeight;
        //items[1].style.width=newWidth;
        matrixChangeSize(rows, cols);
        setTimeout(matrixFadeIn, 1000);
        oldRows = rows;
        oldCols = cols;
        document.getElementById("buttonSubmit").onclick = changeMatrix;
    }
}


function changeMatrix(sizeChanged){
    var rows, cols, min, max, matrixTable, matrixHtml;
    rows = document.getElementById("inputRows").value;
    cols = document.getElementById("inputCols").value;
    min = document.getElementById("inputMin").value;
    max = document.getElementById("inputMax").value;
    matrixTable = document.getElementById("tableMatrix");
    if(!validateInputs(rows, cols, min, max)){
        // do nothing
    }
    else if(!(rows === oldRows && cols == oldCols)){
        matrixFadeOut();
        setTimeout(function() {
            matrixTable.innerHTML = getMatrixNumbers(rows, cols, min, max);
            matrixChangeSize(rows, cols)
        }, 1000);
        setTimeout(matrixFadeIn, 2000);
    }
    else{   // The size is the same
        matrixFadeOut();
        setTimeout(function() {
            matrixTable.innerHTML = getMatrixNumbers(rows, cols, min, max);
            matrixFadeIn();
        }, 1000);
    }
    oldRows = rows;
    oldCols = cols;
}


function getMatrixNumbers(rows, cols, min, max){
    var i, j;
    // Turn each parameter into a number (not a string).
    rows = rows - 0;
    cols = cols - 0;
    min = min - 0;
    max = max - 0;
    matrixHtml = "";
    for(i = 0; i < rows; ++i){
        matrixHtml += "<tr>";
        for(j = 0; j < cols; ++j){
            matrixHtml += "<td>";
            matrixHtml += ("" + Math.floor((Math.random() * (max-min+1)) + min));
            matrixHtml += "</td>";
        }
        matrixHtml += "</tr>";
    }
    return matrixHtml;
}


function matrixFadeOut(){
    document.getElementById("tableMatrix").style.opacity="0";
    document.getElementById("tableMatrix").style.visibility="hidden";
}

function matrixFadeIn(){
    document.getElementById("tableMatrix").style.visibility="visible";
    document.getElementById("tableMatrix").style.opacity=1;
}

function matrixChangeSize(rows, cols){
    var items = document.getElementsByClassName("divCenterRow");
    var newHeight = (rows*2.2) + "em";
    var newWidth = (cols*2.6) + "em";
    items[0].style.height=newHeight;
    items[1].style.height=newHeight;
    items[2].style.height=newHeight;
    items[1].style.width=newWidth;
}



function validateInputs(rows, cols, min, max){
    var errors, errorHtml, errorDiv, i;
    errorDiv = document.getElementById("divError");
    errors = [];
    if(!isInteger(rows)){
        errors.push("Please enter an integer number of rows.");
        rows = 1; // A number that will not generate any other errors, but will not be used.
    }
    if(!isInteger(cols)){
        errors.push("Please enter an integer number of columns.");
        cols = 1; // A number that will not generate any other errors, but will not be used.
    }
    if(!isInteger(min) || !isInteger(max)){
        var errorMessage = "";
        errorMessage += "The randomly-generated matrix is a matrix of integers only.";
        if(!isInteger(min) && isInteger(max)){
            errorMessage += "  Please enter an integer for the minimum value.";
            min = 0; // A number that will not generate any other errors, but will not be used.
        }
        else if(!isInteger(max) && isInteger(min)){
            errorMessage += "  Please enter an integer for the maximum value.";
            max = 0; // A number that will not generate any other errors, but will not be used.
        }
        else{ // Both of them are not integers
            errorMessage += "<ul>";
            errorMessage += "<li>Please enter an integer for the minimum value.</li>";
            errorMessage += "<li>Please enter an integer for the maximum value.</li>";
            errorMessage += "</ul>";
            min = 0;
            max = 0; // Numbers that will not generate any other errors, but will not be used.
        }
        errors.push(errorMessage);
    }

    // Turn everything into a number.
    // If it wasn't in the right format to begin with, the tests above would have turned it into a number.
    rows = rows - 0;
    cols = cols - 0;
    min = min - 0;
    max = max - 0;

    if(rows < 1)
        errors.push("The number of rows must be positive.");
    if(rows > 15)
        errors.push("Please keep the number of rows at 15 or less.");
    if(cols < 1)
        errors.push("The number of columns must be positive.");
    if(cols > 15)
        errors.push("Please keep the number of columns at 15 or less.");
    if(min > max)
        errors.push("The minimum value must be no greater than the maximum value.");
    if(min <= -1000)
        errors.push("Please keep the minimum greater than &minus;1000.");
    if(max >= 1000)
        errors.push("Please keep the maximum less than 1000.");
    if(errors.length > 0){
        errorHtml = "<ul>";
        for(i = 0; i < errors.length; ++i)
            errorHtml += "<li>" + errors[i] + "</li>";
        errorHtml += "</ul>";
        errorDiv.innerHTML = errorHtml;
        errorDiv.className = "error";
        return false;
    }
    errorDiv.className = "error hidden";
    return true;
}

function isInteger(x){
    return !isNaN(x) && parseInt(Number(x)) == x && !isNaN(parseInt(x, 10));
    //from http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
}

function resetPage(){
    document.getElementById("divForm").className = "";
    //document.getElementById("divMatrix").className = "hidden";
    document.title="Random Matrix Generator";
}
