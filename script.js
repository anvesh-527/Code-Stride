document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-btn");
    const userNameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // Return true/false based on some rules for a user name.
    function validateUser(username) {
        if(username.trim()=="") {
            alert("Username cannot be empty.");
            return false;
        }
        const pattern = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
        const isMatching = pattern.test(username);
        if(!isMatching) {
            alert("Invalid Username.");  
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const targetUrl = 'https://leetcode.com/graphql/';
        const myHeaders = new Headers();
        myHeaders.append("content-type","application/json");

        const graphql = JSON.stringify(
        {
            query:
                "\n    query userProfileUserQuestionProgressV2($username: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n      difficulty\n    }\n    numFailedQuestions {\n      count\n      difficulty\n    }\n    numUntouchedQuestions {\n      count\n      difficulty\n    }\n    userSessionBeatsPercentage {\n      difficulty\n      percentage\n    }\n  }\n}\n    ",
            variables:{"username" : '${username}'}
        });
        
        const requestOptions = {
            method:"POST",
            headers:myHeaders,
            body:graphql,
            redirect:"follow"
        };

        try{
            searchButton.textContent="Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Unable to fetch the user details.");
            }
            const data = response.json();
            console.log("data is",data);
        } catch (error) {
            statsContainer.innerHTML = "<p>No data found</p>";
        } finally {
            searchButton.disabled = false;
            searchButton.textContent="Search";
        }
    }

    searchButton.addEventListener('click',function() {
        const username  = userNameInput.value;
        if(validateUser(username)) {
            fetchUserDetails(username);
        }
    });
});