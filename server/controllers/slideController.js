import Slide from "../models/slideModel.js"

export {
    slidePOST,
    slideGETALL,
    slideGETONE,
    slideGETproject,
    slideUPDATEONE,
    slideDELETE
};

const slidePOST = async (req, res) => {

    const postSlide = await Slide.create(
        {
            projectID: req.body.projectID,
            templateID: req.body.templateID
        }
    );

    res.status(200).json(postSlide)
};

const slideGETALL = async (req, res) => {

};

const slideGETONE = async (req, res) => {

    const slideInfo = await Slide.findById({ _id: req.params.slideID.trim()})
    console.log(slideInfo)

    res.status(200).json(slideInfo);
};

const slideGETproject = async (req, res) => {
    const slidesFromProject = await Slide.find({ projectID: req.params.projectID });
    console.log(slidesFromProject);
    console.log(req.params.projectID);
    res.status(200).json(slidesFromProject);
}

const slideDELETE = async (req, res) => {
    try{
    const deleteSlide = await Slide.deleteOne({_id: req.params.slideID});
    res.status(200).json(deleteSlide);
    } catch {
        res.status(500).json({ error: 'An error occurred while deleting the slide', details: error.message })
    }
}

const slideUPDATEONE  = async (req, res) => {
    const updateSlide = await Slide.updateOne({ _id: req.params.slideID}, {
        text_01: req.body.text_01,
        text_02: req.body.text_02,
        text_03: req.body.text_03,
        text_04: req.body.text_04,
        text_05: req.body.text_05,
        text_06: req.body.text_06,
        text_07: req.body.text_07,
        text_08: req.body.text_08,
        text_09: req.body.text_09,
        text_10: req.body.text_10,
    });
    res.status(200).json(updateSlide);
}
