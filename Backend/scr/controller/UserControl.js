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
            const { username, password, email, phone, birthday} = req.body;

            const [, affecRows] = await connection.query(`
                INSERT INTO users (id, username, password, email, phone, birthday, create_att, update_att)
                VALUES (default, '${username}', '${password}', '${email}', '${phone}', '${birthday}', NOW(), NOW());
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

        const { filter } = req.body;

        let sql = `SELECT * FROM users`;
        if (filter) {
            sql += ` where username like '%${filter}%'`;
        } 

        try {
            const [, data] = await connection.query(sql)

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
            const { id, username, password, email, phone, birthday } = req.body;

            const [, data] = await connection.query(`
                UPDATE users SET username = '${username}', password = '${password}', email = '${email}',
                phone = '${phone}', birthday = '${birthday}',
                update_att = NOW()
                WHERE id = ${id}
            `)

            response.sucess = true;
            response.data = data;

        } catch (error) {            
            response.error.push(error);
        }

        return res.json(response);
    }


};