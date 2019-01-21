class User
{
    constructor(
        name,
        gender,
        birth,
        country,
        email,
        password,
        photo,
        admin
    )
    {
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        
    }//END constructor





    /** Getter */
    get register() { return this._register; }//END register

    /** Getter */
    get name() { return this._name; }//END name

    /** Getter */
    get gender() { return this._gender; }//END gender

    /** Getter */
    get birth() { return this._birth; }//END birth

    /** Getter */
    get country() { return this._country; }//END country

    /** Getter */
    get email() { return this._email; }//END email

    /** Getter */
    get password() { return this._password; }//END password

    /** Getter */
    get photo() { return this._photo; }//END photo

    /** Getter */
    get admin() { return this._admin; }//END admin








    
    /** Setter */
    //set name(value) { this._name = value; }//END name

    /** Setter */
    //set gender(value) { this._gender = value; }//END gender

    /** Setter */
    //set birth(value) { this._birth = value; }//END birth

    /** Setter */
    //set country(value) { this._country = value; }//END country

    /** Setter */
    //set email(value) { this._email = value; }//END email

    /** Setter */
    //set password(value) { this._password = value; }//END password

    /** Setter */
    set photo(value) { this._photo = value; }//END photo

    /** Setter */
    //set admin(value) { this._admin = value; }//END admin


    





}//END class User