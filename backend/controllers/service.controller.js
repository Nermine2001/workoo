const Service = require("../models/service.model");

exports.createService = async (req, res) => {
    try {
        //const { name, category, location, salary, description, image } = req.body;
        //const service = new Service({ name, category, location, salary, description, image });
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({ service, message: "Service created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().populate("idUser", "firstname lastname image");
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyServices = async (req, res) => {
    try {
        const services = await Service.find({ idUser: req.params.id }).populate("idUser", "firstname lastname image");
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate("idUser", "firstname lastname image");
        if (!service) {
            return res.status(404).json({ message: "Service not found" }); 
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};