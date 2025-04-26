const Proposal = require("../models/proposal.model");

exports.createProposal = async (req, res) => {
    try {
        //const { price, days, cover, idService, idUser } = req.body;
        const proposal = new Proposal(req.body);
        await proposal.save();
        res.status(201).json({ proposal, message: "Proposal created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProposalsByServiceId = async (req, res) => {
    try {
        const proposals = await Proposal.find({ idService: req.params.id }).populate("idUser", "firstname lastname image");
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProposalsByUserId = async (req, res) => {
    try {
        const proposals = await Proposal.find({ idUser: req.params.id }).populate("idService", "name");
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProposal = async (req, res) => {
    try {
        const proposal = await Proposal.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json({ message: "Proposal deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.acceptProposal = async (req, res) => {
    try {
        const proposal = await Proposal.findByIdAndUpdate({_id: req.params.id}, { status: true });
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json({ message: "Proposal accepted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

