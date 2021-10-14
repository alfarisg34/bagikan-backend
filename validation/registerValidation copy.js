const validator = require("validator");
const isEmpty = require("./is-emptyValidation");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name:"" ; 
    data.email = !isEmpty(data.email) ? data.email:"" ; 
    data.password = !isEmpty(data.password) ? data.password:"" ; 
    data.password2 = !isEmpty(data.password2) ? data.password2:"" ; 

    if(!validator.isLength(data.username,{min:3,max:50})){
        errors.name = "Nama Harus diantara 3 dan 50 Karakter";
    }

    if(!validator.isLength(data.password,{min:6,max:50})){
        errors.password = "Password minimal 6 karakter";
    }


    if(validator.isEmpty(data.username)){
        errors.name = "Data nama dibutuhkan";
    }
    
    if(validator.isEmpty(data.email)){
        errors.email = "Data Email dibutuhkan";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Email tidak valid";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Data Password dibutuhkan";
    }   

    // if(!validator.equals(data.password2,data.password)){
    //     errors.password2 = "Data password dan confirmed password harus sama";
    // }

    // if(validator.isEmpty(data.password2)){
    //     errors.password2 = "Data Confirm Password dibutuhkan";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}