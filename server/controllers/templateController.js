import Template from "../models/templateModel.js"

export {
    templatePOST,
    templateGETALL
};

const templatePOST = async (req, res) => {

    const postTemplate = await Template.create({ name: req.body.name })

    res.status(200).json(postTemplate)
}

const templateGETALL = async (req, res) => {

    const templateList = await Template.find( {}).sort( {createdAt: -1})
    res.status(200).json(templateList)
}