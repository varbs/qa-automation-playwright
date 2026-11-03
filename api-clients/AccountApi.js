async function readResponse(response) {
    return {
        status: response.status(),
        body: await response.json()
    }
}

class AccountApi {
    constructor(request) {
        this.request = request;
        this.createUrl = '/api/createAccount';
        this.updateUrl = '/api/updateAccount';
        this.deleteUrl = '/api/deleteAccount';
        this.getByEmailUrl = '/api/getUserDetailByEmail';
        this.verifyLoginUrl = '/api/verifyLogin';
    }

    async createAccount(user) {
        return readResponse(await this.request.post(this.createUrl, { form: user }));
    }

    async getAccountByEmail({ email }) {
        return readResponse(await this.request.get(this.getByEmailUrl, { params: { email } }));
    }

    async updateAccount(user) {
        return readResponse(await this.request.put(this.updateUrl, { form: user }));
    }

    async deleteAccount({ email, password }) {
        return readResponse(await this.request.delete(this.deleteUrl, { form: { email, password } }));
    }

    async deleteVerifyLogin() {
        return readResponse(await this.request.delete(this.verifyLoginUrl));
    }

    async verifyLogin({ email, password } = {}) {
        const form = {};
        // if email is not undefined, add the email property to the form
        if (email !== undefined) form.email = email;
        // if password is not undefined, add the password property to the form
        if (password !== undefined) form.password = password;

        return readResponse(
            await this.request.post(this.verifyLoginUrl, { form })
        );
    }
}

module.exports = { AccountApi };