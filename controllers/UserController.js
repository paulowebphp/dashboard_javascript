class UserController
{

    constructor( formIdCreate, formIdUpdate, tableId )
    {

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();

    }//END constructor




    onEdit()
    {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e =>
        {
            this.showPanelCreate();

        });//end querySelector

        this.formUpdateEl.addEventListener("submit", event =>
        {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            /** Object.assign() mescla 2 Objetos */
            let result = Object.assign({}, userOld, values);

            this.getPhoto(this.formUpdateEl).then( ( content ) =>
            {

                if( !values.photo )
                {
                    result._photo = userOld._photo;

                }//end if
                else
                {
                    result._photo = content;

                }//end else

                tr.dataset.user = JSON.stringify(result);

                tr.innerHTML = `
        
                    <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${result._name}</td>
                    <td>${result._email}</td>
                    <td>${(result._admin) ? 'Sim' : 'Não'} </td>
                    <td>${Utils.dateFormat(result._register)}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
            
                `;//end innerHTML

                this.addEventsTr(tr);

                this.updateCount();

                this.formUpdateEl.reset();

                btn.disabled = false;

                this.showPanelCreate();

            }, ( e ) =>
            {

                console.log(e);
                
            });//end getPhoto

        });//end addEventListener



    }//END onEditCancel




    onSubmit()
    {
        
        this.formEl.addEventListener("submit", event =>
        {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if( !values ) return false;

            this.getPhoto(this.formEl).then( ( content ) =>
            {

                values.photo = content;

                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;

            }, ( e ) =>
            {

                console.log(e);
                
            });//end getPhoto

        });//end getElementById

    }//END onSubmit




    getPhoto( formEl )
    {

        return new Promise( ( resolve, reject ) =>
        {

            let fileReader = new FileReader();

            /** Transformando o Objeto this.formEl.elements em
             * Array. O perador Spread poupa ter que indicar cada 
             * um dos indices de um array.
             */
            let elements = [...formEl.elements].filter( item =>
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

            if( file )
            {
                fileReader.readAsDataURL(file);

            }//end if
            else
            {
                resolve('dist/img/boxed-bg.jpg');
                
            }//end else
    
        });//end Promise

    }//END getPhoto





    getValues( formEl )
    {
        let user = {};

        let isValid = true;

        /** Transformando o Objeto this.formEl.elements em
         * Array. O perador Spread poupa ter que indicar cada 
         * um dos indices de um array.
         */
        [...formEl.elements].forEach( function(field, index)
        {

            if(
                [ 'name','email','password' ].indexOf(field.name) > -1
                &&
                !field.value
            )
            {
                field.parentElement.classList.add('has-error');

                isValid = false;

            }//end if

            if( field.name == "gender" )
            {
                if( field.checked )
                {
                    user[field.name] = field.value;
    
                }//end if
            
            }//end if
            else if( field.name == "admin" )
            {
                user[field.name] = field.checked;

            }//end else if
            else
            {
                user[field.name] = field.value;
            }//end else
    
        });//end forEach

        if( !isValid ) return false;
    
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
        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'} </td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
    
        `;//end innerHTML

        this.addEventsTr(tr);
        
        this.tableEl.appendChild(tr);

        this.updateCount();

    }//END addLine




    showPanelCreate()
    {
        document.querySelector("#box-user-create").style.display = "block";

        document.querySelector("#box-user-update").style.display = "none";

    }//END showPanelCreate




    addEventsTr( tr )
    {

        tr.querySelector(".btn-delete").addEventListener("click", e =>
        {

            if( confirm("Deseja excluir este usuário?") )
            {

                tr.remove();

                this.updateCount();

            }//end if

        });//end querySelector

        tr.querySelector(".btn-edit").addEventListener("click", e =>
        {

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for( let name in json )
            {

                let field = this.formUpdateEl.querySelector("[name="+name.replace("_","")+"]");

                if( field )
                {
                    switch( field.type )
                    {
                        case 'file':
                            continue;                            
                            break;
                            
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name="+name.replace("_","")+"][value="+json[name]+"]");
                            field.checked = true;                       
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];
                            break;

                    }//end switch                  

                }//end if

            }//end for

            this.formUpdateEl.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();

        });//end querySelector

    }//END addEventsTr




    showPanelUpdate()
    {

        document.querySelector("#box-user-create").style.display = "none";

        document.querySelector("#box-user-update").style.display = "block";

    }//END showPanelUpdate




    updateCount()
    {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach( tr =>
        {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if( user._admin ) numberAdmin++;

        });//end forEach
           
        document.querySelector("#number-users").innerHTML = numberUsers;

        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }//END updateCount







}//END class UserController