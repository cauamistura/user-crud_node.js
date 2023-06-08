const connection = require('../database/connection')

const responseModel = {
    sucess : false,
    data : [],
    error : []
};

module.exports = {

    async create(req, res) {
        const response = { ...responseModel };
        try {
            const { username, password, email } = req.body;

            const [, affecRows] = await connection.query(`
                INSERT INTO users (id, username, password, email, create_att, update_att)
                VALUES (default, '${username}', '${password}', '${email}', NOW(), NOW());
            `)

            response.sucess = affecRows > 0;
            response.data = affecRows;
        } catch (error) {
            response.error.push(error);
        }
        return res.json(response);
    },

    async login(req, res) {
        const response = { ...responseModel };
        try {
            const { email, password } = req.body;

            const [, data] = await connection.query(`
                SELECT * FROM users WHERE email = '${email}' and password = '${password}'
            `)

            response.sucess = data.length > 0;
            response.data = data;

        } catch (error) {
            response.error.push(error);
        }
        return res.json(response);
    },

    async getAll(req, res) {
        const response = { ...responseModel };
        try {
            const [, data] = await connection.query(`
                SELECT * FROM users
            `)

            response.sucess = data.length > 0;
            response.data = data;

        } catch (error) {
            response.error.push(error);
        }

        return res.json(response);
    },

    async delete(req, res) {
        const response = { ...responseModel };
        try {
            const { id } = req.body;

            const [, data] = await connection.query(`
                DELETE FROM users WHERE id = ${id}
            `)

            response.sucess = true;
            response.data = data;

        } catch (error) {
            response.error.push(error);
        }

        return res.json(response);
    },

    async update(req, res) {
        const response = { ...responseModel };
        try {
            const { id, username, password, email } = req.body;

            const [, data] = await connection.query(`
                UPDATE users SET username = '${username}', password = '${password}', email = '${email}', update_att = NOW()
                WHERE id = ${id}
            `)

            response.sucess = true;
            response.data = data;

        } catch (error) {
            response.sucess = false;
            response.error.push(error);
        }

        return res.json(response);
    }


};