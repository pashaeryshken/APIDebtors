const Debtors = require("../models/debtors");
const People = require("../models/people");

exports.createDebtors = async function (body, user) {
    try {
        const people = await People.findById({_id: body.peopleId});

        const {isI, amount, date, currency, status} = {...body}
        const {dateStart, dateEnd} = {...date};
        const debtor = {
            isI,
            amount,
            dateStart,
            dateEnd,
            currency,
            status
        };
        const debtors = new Debtors({...debtor, userId: user.id, people: people._id});
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

    console.log(body)
    try {
        const {isI, amount, date, currency} = {...body};
        const {dateStart, dateEnd} = {...date};
        const debtor = {
            isI,
            amount,
            dateStart,
            dateEnd,
            currency
        };
        console.log('asdasdasd')
        const oldDebtor = await Debtors.findById({_id: body.id});
        if (!oldDebtor) throw {message: 'DEBTOR_NOT_FOUND'};

        if (oldDebtor.people !== body.peopleId) {
            const people = await People.findById({_id: body.peopleId});
            debtor.people = people._id
        }

        console.log(debtor);

        return await Debtors.findOneAndUpdate({_id: body.id},
            {...debtor},
            {new: true}).populate('people')
    } catch (e) {
        throw e
    }
};

exports.updateDebtorStatus = async function(body) {
    const oldDebtor = await Debtors.findById({_id: body.id});
    if (!oldDebtor) throw {message: 'DEBTOR_NOT_FOUND'};
    return await Debtors.findOneAndUpdate({_id: body.id},
        {...body.status},
        {new: true});

};

exports.getDebtorsId = async function (id) {
    try {
        return await Debtors.findById({_id: id}).populate('people');
    } catch (e) {
        throw {message: "DEBTOR_NOT_FOUND"}
    }
};

exports.removeDebtors = async function (id) {
    try {

        const debtor = await Debtors.findOneAndRemove({_id: id});
        if (!debtor) {
            throw {message: "DEBTOR_NOT_FOUND"}
        }
    } catch (e) {
        throw e
    }
};

