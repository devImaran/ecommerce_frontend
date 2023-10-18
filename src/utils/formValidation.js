const EmptyField ="This field is required !"

export const formValidation = (data) =>{
    let isValid = true
    let errors = {}

    Object.keys(data).forEach(item=>{

      //validate for empty
      if (!data[item]){
        errors =  {...errors, [item] : EmptyField }
        isValid = false
      }else{
        errors =  {...errors, [item] : '' }
      }
    })

    return {
        isValid ,
        fieldErrors : errors
    }
  }
