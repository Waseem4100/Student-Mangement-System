// Importing required modules
import inquirer from "inquirer";



//----------------------------------- start student management ---------------------
console.log(`starting student management system`)

class student{
    
    static idcounter : number = 0;
    studentId : number 
    courses: string[] = [];
    balance : number = 0;

    constructor(public name : string){ 

        student.idcounter++; 
        this.studentId = this.generateStudentId();

    }
        generateStudentId(){
            return 1000+ student.idcounter;
        }

        enrollcourse(course:string){
            this.courses.push(course);
            this.balance += 1000
        }

        veiwbalance():number{
            return this.balance
        }
        paycourse(amount:number){
            this.balance -=amount

        }
        showstatus(){
            console.log(`
             Name: ${this.name}   
             ID : ${this.studentId} 
             courses Enrolled : ${this.courses.join(",")}
             balance : ${this.balance}
               `)
        }

        getstudentid():number{
            return this.studentId
        }

        getname(){
            return this.name
        }

        getcourse(){
            return this.courses

        }
    }

let students:student[]=[]

async function main(){

    //-------------------------------- initializing while loop--------------------------------
let while_condiation= true
while(while_condiation){
let answer = await inquirer.prompt([{
    type:"list",
    name: "options",
    message : "choose an option",
    choices :[
        "add student",
        "veiw student status",
        "edit student status",
        "delete student",
        "exit",
    ]
}])

// ----------------------------------- add student -------------------------------------------------
 
if ( answer.options=== "add student") {
    let answer = await inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter the name of the student"
    },
    {
        type: "list",
        name: "courses",
        message: "select the course",
        choices: ["typescript", "html & CSS", "React"]
    
    },
    {
        type: "number",
        name: "payment",
        message: "amount paid for the course",
    },
    ]);
let enrolledcourse = answer.courses
let newStudent = new student(answer.name); 
students.push(newStudent);   
newStudent.enrollcourse(enrolledcourse)

newStudent.paycourse(answer.payment)


console.log(`${newStudent.getname()} has been added  with ${newStudent.getstudentid()} sucessfully`)
console.log(`${newStudent.getname()} enrolled in course ${enrolledcourse}`)
console.log(`paid ${answer.payment} amount of course ${enrolledcourse} remaining balance ${newStudent.veiwbalance()}`)

}

//-------------------------------------- veiw student status ----------------------------------------

  
 if ( answer.options=== "veiw student status") {
 let answer = await inquirer.prompt([{
    type: "list",
    name:"status",
    message:" selecte an student",
    choices: students.map((selected)=>({
        name : selected.getname(),
        value :selected.getstudentid()
    })),
}])

let veiw = (students.find((selected)=>selected.getstudentid() == answer.status))
console.log(veiw)
}

 
 

//-----------------------------------------edit student ------------------------------------------------
if (answer.options === "edit student status") {
    let edit_student = await inquirer.prompt([{
        type: "list",
        name: "edit",
        message: "Choose task to edit",
        choices: students.map((student) => ({
            name: student.getname(),
            value: student.getstudentid()
        }))
    }]);

    let edited_student_id = parseInt(edit_student.edit);
    let edited_student = students.find((student) => student.getstudentid() === edited_student_id);

    if (edited_student) {
        let edit_answer = await inquirer.prompt([{
            type: "input",
            name: "newname",
            message: "Enter the new name of the student"
        },
        {
            type: "list",
            name: "newcourses",
            message: "select new course",
            choices: ["typescript", "html & CSS", "React"]
        },
        {
            type: "number",
            name: "newpayment",
            message: "amount paid for the course",
        }]);

        if (edit_answer.newname !== "") {
            edited_student.name = edit_answer.newname;
            edited_student.enrollcourse(edit_answer.newcourses);
            edited_student.paycourse(edit_answer.newpayment);

            console.log(`${edited_student.getname()} has been edited successfully with ID: ${edited_student.getstudentid()}`);
            console.log(` ${edited_student.getname()} Enrolled in course: ${edit_answer.newcourses}`);
            console.log(`Paid ${edit_answer.newpayment} for course ${edit_answer.newcourses}. Remaining balance: ${edited_student.veiwbalance()}`);
        } else {
            console.log("New student name cannot be empty");
        }
    } else {
        console.log("Student not found in list");
    }
}

//------------------------------------------- delete student ------------------------------------------
 
if ( answer.options=== "delete student"){

    let delete_student = await inquirer .prompt([{
        type:"list",
        name:"delete",
        message:"select a student",
        choices: students.map((student) => ({
            name: student.getname(),
            value: student.getstudentid()
        }))
    }])

    let  deletedstudentId = delete_student.delete;
    let deletedStudent = students.find((student) => student.getstudentid() === deletedstudentId);

    if (deletedStudent) {
        students = students.filter((student) => student.getstudentid() !== deletedstudentId);
        console.log("Student  deleted successfully");
        console.log(students);
    } else {
        console.log("Student not found in list");
    }
}
 
//---------------------------------------- exit ---------------------------------

 if ( answer.options=== "exit") {
    console.log("Thank you for using our system");
    process.exit()
 }

 

}}
main()


