const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const UserService = require('./user.service');
const service = new UserService();
const { config } = require('../../config');

/**
 * Auth Service class to manage the logic of the auth
 * 
 * #### Example
 * ```javascript
 * const service = new AuthService();
 * ```
 * 
 */
class AuthService {
	/**
	 * Finds the user with the email and password
	 * and validates the existence of a user
	 * by comparing the provided password
	 * with the stored password
	 * @param {string} email - user email
	 * @param {string} password - user password
	 * @returns {object} user that matches the email and password
	 */
	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}

		delete user.dataValues.password;
		return user;
	}

	/**
	 * Firma un token JWT con la informacion
	 * necesaria del usuario para definir su rol
	 * @param {*} user - objeto usuario
	 * @returns - token firmado
	 */
	/**
	 * Signs a JWT token with the user information
	 * @param {*} user - user object
	 * @returns {*} signed token
	 */
	signToken(user) {
		const payload = {
			sub: user.id,
			scope: user.role,
		};

		const token = jwt.sign(payload, config.jwtSecret);
		delete user.dataValues.recoveryToken;

		return { user, token };
	}

	/**
	 * Sends an email to the user's email with
	 * the nodemailer transport object
	 * @param {*} infoMail - user email
	 * @returns {*} response message
	 */
	async sendMail(infoMail) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			secure: true,
			port: 465,
			auth: {
				user: config.smtpEmail,
				pass: config.smtpPassword,
			},
		});

		await transporter.sendMail(infoMail);
		return { message: 'mail enviado' };
	}

	/**
	 * Provides information to the email
	 * @param {*} email - user email
	 * @returns {*} email sent
	 */
	async sendRecovery(email) {
		// Valida si el usuario existe
		const user = await service.findByEmail(email);

		if (!user) {
			throw boom.unauthorized();
		}

		const payload = { sub: user.id };
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
		const link = `https://giftify.netlify.app/recuperar?token=${token}`;
		await service.update(user.slug, { recoveryToken: token });

		const mail = {
			from: `Giftify <${config.smtpEmail}>`,
			to: `${user.email}`,
			subject: 'Recuperar contraseña',
			html: `¡Hola, <b>${user.firstName}</b>!
			</br>
			</br>
			<b>Ingresa a este link para cambiar tu contraseña:</b>
			</br>
			</br>
			<a href='${link}'>Cambiar contraseña</a>`,
		};

		const response = await this.sendMail(mail);
		return response;
	}

	/**
	 * Changes the user's password with the recovery token
	 * @param {*} token - recovery token
	 * @param {*} newPassword - new password
	 * @returns {*} response message
	 */
	async changePassword(token, newPassword) {
		try {
			const payload = jwt.verify(token, config.jwtSecret);
			const user = await service.findOne(payload.sub);

			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}

			const hash = await bcrypt.hash(newPassword, 13);
			await service.update(user.slug, { recoveryToken: null, password: hash });

			return { message: 'Contraseña modificada' };
		} catch (error) {
			console.log(error);
			throw boom.unauthorized();
		}
	}
}

module.exports = AuthService;
