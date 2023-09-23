function createEmployeeRecord(employeeArray) {
    let employee = {};
    employee.firstName = employeeArray[0];
    employee.familyName = employeeArray[1];
    employee.title = employeeArray[2];
    employee.payPerHour = employeeArray[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
  
    return employee;
  }

function createEmployeeRecords(array) {
    let employeeRecords = array.map(function(employeeArray) {
      return createEmployeeRecord(employeeArray);
    });
    return employeeRecords;
}

function createTimeInEvent (employee, dateStamp){
    const [date, time] = dateStamp.split(' ')
    const hour = parseInt(time, 10)

    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employee.timeInEvents.push(timeInEvent);
    return employee;
}


function createTimeOutEvent(employee, dateStamp){
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10);

    const timeOutEvent = {
      type: "TimeOut",
      hour: hour,
      date: date
    };

    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = employee.timeInEvents.reduce((totalHours, event) => {
      if (event.date === date) {
        const timeOutEvent = employee.timeOutEvents.find(e => e.date === date);
        return timeOutEvent.hour - event.hour;
      }
      return totalHours;
    }, 0);
    return hoursWorked / 100;
}

function wagesEarnedOnDate(employeeObject, date){
    const payRate = employeeObject.payPerHour;
    const hoursWorked = hoursWorkedOnDate(employeeObject, date);
    const payOwed = hoursWorked * payRate;
    // console.log(payOwed);
    return payOwed;
}

function allWagesFor(employeeObject) {
    let totalPay = 0;
    for (let i = 0; i < employeeObject.timeInEvents.length; i++) {
      const date = employeeObject.timeInEvents[i].date;
      const payOwed = wagesEarnedOnDate(employeeObject, date);
      totalPay += payOwed;
    }
    return totalPay;
}

function calculatePayroll(employeeRecords){
    let totalPayroll = 0;
    for (let i = 0; i < employeeRecords.length; i++) {
      const employee = employeeRecords[i];
      const employeePay = allWagesFor(employee);
      totalPayroll += employeePay;
    }
    return totalPayroll;
  }

//createEmployeeRecord test cases
// if(require.main===module){
//     console.log("Expecting: {firstName: John, familyName: Smith, title: employee, payPerHour: 17, timeInEvents: 09:00, timeOutEvents 05:00");
//     console.log("=>", createEmployeeRecord("John", "Smith", "employee", 17));

//     console.log("");
// }
// module.exports = createEmployeeRecord;
// //createEmployeeRecords test cases
// if(require.main===module){
//     console.log("Expecting:[{firstName: John, familyName: Smith, title: employee, payPerHour: 17},{firstName: May, familyName: Day, title: employee, payPerHour: 19}]")
//     console.log("=>", createEmployeeRecords([["John", "Smith", "employee", 17],["May", "Day", "employee", 19]]));

//     console.log("");

// }
// module.exports = createEmployeeRecord