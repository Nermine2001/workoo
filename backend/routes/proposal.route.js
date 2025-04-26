const express = require("express");

const { createProposal, getProposalsByServiceId, getProposalsByUserId, deleteProposal, acceptProposal } = require("../controllers/proposal.controller");

const router = express.Router();

const Proposal = require("../models/proposal.model");
const Service = require("../models/service.model");

router.get('/count', async (req, res) => {
    try {
        const id  = req.query.id;
        const count = await Proposal.countDocuments({idUser: id}); 

        const myServices = await Service.find({ idUser: id }).select("_id");
        const myServicesIds = myServices.map(service => service._id);

        const myCount = myServicesIds.length;

        const myProposals = await Proposal.countDocuments({ idService: { $in: myServicesIds } });

        res.status(200).json({ count, myCount, myProposals }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.post("/create", createProposal);
router.get("/service/:id", getProposalsByServiceId);
router.get("/my/:id", getProposalsByUserId);
router.delete("/:id", deleteProposal);
router.put("/accept/:id", acceptProposal);






module.exports = router;