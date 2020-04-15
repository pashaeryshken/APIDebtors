const express = require("express")
const debtorsController = require("../controllers/debtorsController")
const debtorsRouter = express.Router();
const {check} = require("express-validator/check");
const auth = require("../middleware/auth")
const {validationResult} = require("express-validator/check");

debtorsRouter.post("/create", auth, [/*...*/], async (request, response) => {
    try {
        const debtors = await debtorsController.createDebtors(request.body, request.user)

        response.status(200).json(debtors)
    } catch (err) {
        response.status(400).json(err)
    }

});

debtorsRouter.get("/", auth, async (request, response) => {
    try {
        const debtors = await debtorsController.getDebtorAll(request.user.id);
        response.status(200).json(debtors)
    } catch (err) {
        response.status(500).json(err)
    }
});

debtorsRouter.put("/", auth, [
    check("id").not().isEmpty(),
    check("isI"),
    check("name", "Please enter name"),
    check("amount", "Please enter amount")
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const debtor = await debtorsController.updateDebtors(request.body);
        response.status(200).json(debtor)
    } catch (err) {
        response.status(500).json(err)
    }
});

debtorsRouter.put("/status", auth, [], async (request, response) => {
    try {
        const debtor = await debtorsController.updateDebtorStatus(request.body);
        response.status(200).json(debtor)
    } catch (err) {
        response.status(500).json(err)
    }
});

debtorsRouter.get("/:id", auth, async (request, response) => {
    try {
        const debtor = await debtorsController.getDebtorsId(request.params.id);
        response.status(200).json(debtor)
    } catch (err) {
        response.status(400).json(err)
    }
});

debtorsRouter.delete("/:id", auth, async (request, response) => {
    try {
        await debtorsController.removeDebtors(request.params.id);
        response.status(200).json({message: 'SUCCESS'})

    } catch (err) {
        response.status(400).json(err)
    }
});

module.exports = debtorsRouter;
