var fields = document.querySelectorAll("#form-user-create [name]");

var user = {};

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
