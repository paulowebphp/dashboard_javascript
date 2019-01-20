var fields = document.querySelectorAll("#form-user-create [name]");

/** Objeto JSON */
var user = {};



function addLine(dataUser)
{
    
    var tr = document.createElement("tr");

    tr.innerHTML = `
    
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    
    `;

    document.getElementById("table-users").appendChild(tr);

}//END addLine




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

    addLine(user);

});//end getElementById