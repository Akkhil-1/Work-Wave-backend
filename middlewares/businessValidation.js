const zod = require('zod');
const schemaOne = zod.object({
    businessName : zod.string().min(3),
    state : zod.string().min(1),
    city : zod.string().min(1),
    pincode: zod.number()
    .refine(value => value.toString().length === 6, {
        message: "Pincode must be a 6-digit number",
    }),
    businessType : zod.string().min(1),
    // add owner and services
    contactEmail : zod.string().email().min(1),
    contactPhone: zod.string()
    .length(10, 'Mobile number must be exactly 10 digits')
    .regex(/^\d+$/, 'Mobile number must contain only digits')
})
function validateBusiness(req, res, next) {
    try
    {
        const {businessName, state , city , pincode , businessType , contactEmail , contactPhone} = req.body;
        schemaOne.safeParse(businessName, state , city , pincode , businessType , contactEmail , contactPhone)
        console.log('validation successfull');
    }

    catch(err)
    {
        console.log('validation not successfull' , err);
        res.json({
            msg : 'Please fill correct information'
        })
    }
    next()
};
module.exports = validateBusiness