
const db = require('../Database/mySql');


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bloodbankmanagement10@gmail.com",
        pass: "ppoy wupp kygj nrez",
    },
});

const test = (req, res) => {
    res.json("Test Working");
}

const getDonar = (req, res) => {
    let sql = "SELECT * FROM centers";
    try {
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.json(results);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const bookSlot = (req, res) => {
    const {sno, donaremail, receivercontact, receivername, id, receivermail, donarcontact, donararea, donarlocation, units} = req.body

    try {
        let sql = `UPDATE centers SET available = available - ${units} WHERE id = ?`;
        db.query(sql, [id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            
            let sql2 = "UPDATE users SET booked = ? WHERE id = ?";
            db.query(sql2, ["yes", id], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                return res.json("Success");
            });

            const sendto = donaremail;
            const registrationSuccessMail = {
                from: {
                    name : 'Blood Bank Management',
                    address: "bloodbankmanagement10@gmail.com", 
                }, 
                to: sendto,
                subject: `Subject: Order Received from - ${receivername} !`,
                html:
                    "<p>Dear " +
                    "Donar" +
                    `,<br><br>We are excited to inform you that a blood donation order came from ${receivername} through our blood bank management portal !, and we have provided your contact information to the receiver person. <br><br>Here is your blood receiver details: <br><br> Name: ${receivername}<br> Contact : ${receivercontact}.<br><br>If you have any questions, encounter any issues, or need assistance with anything related to providing blood units, please feel free to reach out to our dedicated support team at <a href='mailto:bloodbankmanagement10@gmail.com'>bloodbankmanagement10@gmail.com</a>.<br><br>Warm regards,<br>Blood Bank Management</p>`
            };

            transporter.sendMail(registrationSuccessMail, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Registration successful");
                    res.status(200).json("Status change success");
                }
            });

            const sendtoreceiver = receivermail;
            const registrationAlert = {
                from: {
                    name : 'Blood Bank Management',
                    address: "bloodbankmanagement10@gmail.com", 
                }, 
                to: sendtoreceiver,
                subject: `Subject: Order Successfull - ${receivername} !`,
                html:
                    "<p>Dear " +
                    receivername +
                    `,<br><br>We are excited to inform you that a blood receiving process is proceeded successfully through our blood bank management portal !, and we have provided your contact information to the donar person. <br><br>Here is your blood donar details: <br><br> Name: ${donaremail}<br> Contact: ${donarcontact}<br> Area: ${donararea}<br> Location Link: ${donarlocation}.<br><br>If you have any questions, encounter any issues, or need assistance with anything related to receiving blood units, please feel free to reach out to our dedicated support team at <a href='mailto:bloodbankmanagement10@gmail.com'>bloodbankmanagement10@gmail.com</a>.<br><br>Warm regards,<br>Blood Bank Management</p>`
            };

            transporter.sendMail(registrationAlert, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Registration successful");
                    res.status(200).json("Status change success");
                }
            });

        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Enter the Email and password",
            });
        }

        let sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }

            if (result.length === 0) {
                return res.json({
                    error: "User does not exist",
                });
            }

            const user = result[0];

            if (user.password === password) {
                // Successful login
                res.send(user);
                console.log("Login Successful:", user);
            } else {
                // Incorrect password
                res.json({
                    error: "Username or password is incorrect",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const loginDonar = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Enter the Email and password",
            });
        }

        let sql = "SELECT * FROM donarAdmin WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }

            if (result.length === 0) {
                return res.json({
                    error: "User does not exist",
                });
            }

            const user = result[0];

            if (user.password === password) {
                // Successful login
                res.send(user);
                console.log("Login Successful:", user);
            } else {
                // Incorrect password
                res.json({
                    error: "Username or password is incorrect",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
const changeStatus = (req, res) => {
    const id = req.body.id;
    try {
        let sql = "UPDATE `users` SET `booked` = 'yes' WHERE id = ?;"
        db.query(sql, [id], (err) => {
            if (err) {
                console.log(err);
                res.json("Error")
            }
            res.status(500).json("Status Change success")
        });
    } catch (error) {
        console.log(error);
    }
}

const addDonar = (req, res) => {
    const { name, email, contact, location, available, group, area, amount } = req.body;
    let sql = "INSERT INTO centers (name, email, contact, location, available, `group`, area, amount) VALUES (?,?,?,?,?,?,?,?)";
    let values = [name, email, contact, location, available, group, area, amount];
    console.log(values);
    try {
        db.query(sql, values, (err) => {
            if (err) throw err;
            res.json("Donor added to DB Successfully");
            console.log("Donor added to DB successfully");
        });
    } catch (error) {
        console.log(error);
        res.json("Error occurred while adding record");
    }
};

const SignupDonar = (req, res) => {
    const { name, contact, email, password } = req.body;
    let sql = "INSERT INTO donarAdmin (name, contact, email, password) VALUES (?,?,?,?)";
    let values = [name, contact, email, password];
    console.log(values);
    try {
        db.query(sql, values, (err) => {
            if (err) throw err;
            res.json("DonorAdmin added to DB Successfully");
            console.log("DonorAdmin added to DB successfully");
        });
    } catch (error) {
        console.log(error);
        res.json("Error occurred while adding record");
    }
};


const SignupReceiver = (req, res) => {
    const { name, contact, email, password } = req.body;
    let sql = "INSERT INTO users (name, contact, email, password, booked) VALUES (?,?,?,?,?)";
    let booked = 'no'
    let values = [name, contact, email, password, booked];
    console.log(values);
    try {
        db.query(sql, values, (err) => {
            if (err) throw err;
            res.json("Receiver added to DB Successfully");
            console.log("Receiver added to DB successfully");
        });
    } catch (error) {
        console.log(error);
        res.json("Error occurred while adding record");
    }
};


module.exports = {
    getDonar,
    test,
    bookSlot,
    loginUser,
    loginDonar,
    changeStatus,
    addDonar,
    SignupDonar,
    SignupReceiver
}

