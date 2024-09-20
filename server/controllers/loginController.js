import Admin from "../models/adminModel.js"
export {
    loginPOST,
    loginGET,
};

const loginPOST = async (req, res, next) => {
    res.cookie("validation", req.body.validation);
    res.sendStatus(204);
    next();
};

const loginGET = async (req, res) => {
    console.log(`Input: ${req.params.password}`)

    const admin = await Admin.find( { password: req.params.password} ).then(
        (data) => {
            return data;
        },
    );

    if (admin.length !== 0) {
        if (admin[0].password === req.params.password) {
            res.status(200).json({ validation: "successful" });
        } else {
            res.status(200).json({ validation: "failed" })
        }
    } else {
        res.status(200).json({ validation: "failed" })
    }
}