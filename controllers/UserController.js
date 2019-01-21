class UserController
{

    constructor( formId, tableId )
    {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }//END constructor




    onSubmit()
    {
        
        this.formEl.addEventListener("submit", event =>
        {

            event.preventDefault();

            let values = this.getValues();

            this.getPhoto().then( ( content ) =>
            {

                values.photo = content;

                this.addLine(values);

            }, ( e ) =>
            {

                console.log(e);
                
            });//end getPhoto

        });//end getElementById

    }//END onSubmit




    getPhoto()
    {

        return new Promise( ( resolve, reject ) =>
        {

            let fileReader = new FileReader();

            /** Transformando o Objeto this.formEl.elements em
             * Array. O perador Spread poupa ter que indicar cada 
             * um dos indices de um array.
             */
            let elements = [...this.formEl.elements].filter( item =>
            {
    
                if( item.name === 'photo' )
                {
    
                    return item;
    
                }//end if
                
            });//end filter
    
            let file = elements[0].files[0];
    
            fileReader.onload = () =>
            {
    
                resolve(fileReader.result);
    
            }//end onload

            fileReader.onerror = () =>
            {
                reject(e);

            }//end onerror
    
            fileReader.readAsDataURL(file);

        });//end Promise

    }//END getPhoto



    getValues()
    {
        let user = {};

        /** Transformando o Objeto this.formEl.elements em
         * Array. O perador Spread poupa ter que indicar cada 
         * um dos indices de um array.
         */
        [...this.formEl.elements].forEach( function(field, index)
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
    
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }//END getValues





    addLine( dataUser )
    {
        
        this.tableEl.innerHTML = `
        
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        
        `;//end getElementById

    }//END addLine






}//END class UserController