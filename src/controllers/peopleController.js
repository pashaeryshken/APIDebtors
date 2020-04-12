const People = require("../models/people");
const {PORT} = require("../common/config");

exports.createPeople = async (body, user) => {
    if (!body.files) {
    } else {
        let avatar = body.files.avatar;
        const name = new Date().getTime() + avatar.name;
        avatar.mv(`./uploads/${user.id}/debtors/${name}`);
        body = {...JSON.parse(body.data)};
        body.avatar = name
    }
    if (!body.avatar) {
        body.avatar = null
    } else {
        body.avatar = `http://localhost:${PORT}/${user.id}/debtors/${body.avatar}`
    }
    const people = new People({...body, userId: user.id});
    await people.save();
    return people
};

exports.getPeopleId = async (id) => {
    return await People.findById({_id: id})
};

exports.getPeopleAll = async (id) => {
    return await People.find({userId: id}, "-userId")
};

exports.updatePeople = async function (body) {

    if (!body.id) throw {message: 'DEBTOR_NOT_FOUND'};

    try {
        return await People.findOneAndUpdate({_id: body.id},
            body,
            {new: true}
        )
    } catch (e) {
        throw {message: 'SERVER_FAILED'}
    }
};

exports.removePeople = async (id) =>{
    try {
        const debtor = await People.findOneAndRemove({_id: id});
        if (!debtor){
            throw {message: "DEBTOR_NOT_FOUND"}
        }
    } catch (e) {
        throw e
    }
}
