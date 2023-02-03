class User {
    constructor() {
        this.init();
    }

    init() {
        this.name = localStorage.getItem('userName')
        this.email = localStorage.getItem('userEmail')
        this.prenom = localStorage.getItem('userPrenom')
        this.adresse = localStorage.getItem('userAdresse')
        this.pays = localStorage.getItem('userPays')
        this.telephone = localStorage.getItem('userTelephone')
        this.loggedIn = localStorage.getItem('userLoggedIn')
    }

    /**
     *
     * @param data object
     * @param data.name string
     * @param data.email string
     * @param callback function
     */
    authenticated(data, callback) {
        localStorage.setItem('userName', data.name)
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userPrenom', data.prenom)
        localStorage.setItem('userPays', data.pays)
        localStorage.setItem('userAdresse', data.adresse)
        localStorage.setItem('userTelephone', data.telephone)
        localStorage.setItem('userLoggedIn', true)

        this.init()

        callback()
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }
}