const Debtors = require("../models/debtors");
const People = require("../models/people");

exports.createDebtors = async function (body, user) {
    try {
        console.log(body)
        const people = await People.findById({_id: body.peopleId});
        const debtors = new Debtors({...body, userId: user.id, people: people._id});
        await debtors.save();
        debtors.people = people;
        return debtors;
    } catch (e) {
        throw {message: "error"}
    }
};

exports.getDebtorAll = async function ({userId}) {
    try {
        return await Debtors.find(userId, "-userId").populate('people');

    } catch (e) {
        throw {message: e.message};
    }
};

exports.updateDebtors = async function (body) {

    if (!body.id) throw {message: 'DEBTOR_NOT_FOUND'};

    try {
        return await Debtors.findOneAndUpdate({_id: body.id},
            body,
            {new: true}
        )
    } catch (e) {
        throw {message: 'SERVER_FAILED'}
    }
};

exports.getDebtorsId = async function (id) {
    try {
        return await Debtors.findById({_id: id}).populate('people');


    } catch (e) {
        throw {message: "DEBTOR_NOT_FOUND"}
    }
}

exports.removeDebtors = async function (id) {
    try {
        const debtor = await Debtors.findOneAndRemove({_id: id});
        if (!debtor){
            throw {message: "DEBTOR_NOT_FOUND"}
        }
    } catch (e) {
        throw e
    }
};

