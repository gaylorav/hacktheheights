var isLoading = true;

function logout(){
    axios.get("http://hacktheheights.co.nf/api/logout.php", {withCredentials:true});
    window.location.replace("/");
}

function getUserDetails(){
    console.log("time to get user details!");

    var bodyFormData = new FormData();
    bodyFormData.set("type", "get-user-details");

    axios({
        method: 'post',
        crossDomain: true,
        withCredentials: true,
        url: 'http://www.hacktheheights.co.nf/api/user.php',
        data: bodyFormData
    })
    .then(function (response) {
        console.log("Response: \n");
        console.log(response.data);
        if(response.data.hasOwnProperty('failed')){
            // not logged in
            window.location.replace('/login');
        } else {
            // update values of elements on screen & display them
            var responseData = response.data;
            document.getElementById("firstName").innerText = responseData["firstName"] + "!";
            
            if (responseData["hackerStatus"] == "no application submitted"){
                document.getElementById("hackerBtn").style.display = "block";
            } else {
                document.getElementById("hacker-status-label").innerText = responseData["hackerStatus"];
            }

            if (responseData["mentorStatus"] == "no application submitted"){
                document.getElementById("mentorBtn").style.display = "block";
                document.getElementById("mentor-status-label").innerText = "no application\nsubmitted";
            } else {
                document.getElementById("mentor-status-label").innerText = responseData["mentorStatus"];
            }
            // document.getElementById("hackers-data").innerText = responseData["hackers"];
            // document.getElementById("sponsors-data").innerText = responseData["sponsors"];
            // document.getElementById("mentors-data").innerText = responseData["mentors"];
            // document.getElementById("hackers-pending-data").innerText = responseData["hackers-pending"];
            // document.getElementById("sponsors-pending-data").innerText = responseData["sponsors-pending"];
            // document.getElementById("mentors-pending-data").innerText = responseData["mentors-pending"];


            isLoading = false;
            document.getElementById("page-loader").style.display = "none";
        }
    });
}

function initializePage(){
    console.log("Page Initialized");

    var urlParams = new URLSearchParams(window.location.search);
    if (isLoading){
        // document.getElementById("page-loader");
    }

    getUserDetails();
}

window.onload = initializePage();