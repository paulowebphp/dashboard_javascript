var fields = document.querySelectorAll("#form-user-create [name]");

/** Objeto JSON */
var user = {};


document.getElementById("form-user-create").addEventListener("submit", function(event){

    event.preventDefault();

    fields.forEach( function(field, index)
    {
        if( field.name == "gender" )
        {
            if( field.checked )
            {
                user[field.name] = field.value;

            }//end if
        
        }//end if
        else
        {
            user[field.name] = field.value;
        }//end else

    });//end forEach

    console.log(user);

});//end getElementById