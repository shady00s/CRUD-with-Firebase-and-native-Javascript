import { userData } from "./main.js"

// update data function

export function updateDataToDatabase(IDVal ,callback) {
    let httpReq = new XMLHttpRequest()
    httpReq.open("PATCH", `https://employeesdb-4ba8e-default-rtdb.firebaseio.com/EmployeesData/${IDVal}.json`)
    httpReq.setRequestHeader("Content-Type", "application/json")

    console.log(userData)

    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            if (httpReq.status == 200) {
                alert("Updated user")
                callback()

            } else {
                console.log("Unsuccessfully error, Please try again");
            }
        }
    }
    httpReq.send(JSON.stringify(userData));
}
