 function validateform() {
    var fname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var query = document.getElementById("query").value;
    var emailRange = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a.z]+)?$/

    if (fname == null || fname == "") {
        alert("Please enter your Full Name");
        return false;
    }
    if (email == null || email == "") {
        alert("Please enter valid Email");
        return false;
    }
    if (!emailRange.test(email)) {
        alert("Please enter valid Email");
        return false;
    }
    if (subject == null || subject == "") {
        alert("Please Select a Field");
        return false;
    }
     
    if (query == null || query == "")
        alert("Enter your query details");
        return false;
}





// Opening the form (accessing the <div> tags to open the content)
function openForm() {
    document.getElementById("wholeform").style.display = "block";
    document.getElementById("queryForm").style.display = "block";
}

// Closing the form (accessing the <div> tags to close the content)
function closeForm() {
    document.getElementById("queryForm").style.display = "none";
}

// Clearing the form contents 
function cleartext() {
    document.getElementById("display-text").style.display = "none";
    document.getElementById("wholeform").style.display = "none";
}

// Displaying form contents in the page
function displaytext() {
    document.getElementById("display-text").style.display = "block";
    document.getElementById("names").innerHTML = "Full Name  :   " + document.getElementById("fullname").value + "<br><br>";
    document.getElementById("emails").innerHTML = "Email    :   " + document.getElementById("email").value + "<br><br>";
    document.getElementById("subjects").innerHTML = "favorite catagory  :  " + document.getElementById("subject").value + "<br><br>";
    document.getElementById("querys").innerHTML = "Message    :   " + document.getElementById("query").value + "<br><br>";
    document.getElementById("rates").innerHTML = "Rate  :  rated" +  "<br><br>";
}




function editbtn() {
    cleartext();
    openForm();
}
function checkbtn() {
    closeForm();
    displaytext();
}

function sendbtn() {

    cleartext();
    openForm();
    // Clearing content of the form
    document.getElementById("form").reset();

}