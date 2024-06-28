const asyncHandler = require('express-async-handler')

const Contacte = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contacte.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
const createContact = asyncHandler(async (req, res) => {
    console.log('the body is', req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        console.log('Nahi ho rha bhai');
        throw new Error("All fields are mandatory");
    }
    const contact = await Contacte.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contacte.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contacte.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contacte.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contacte.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    } await Contacte.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' })
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }