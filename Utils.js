class Utils {
	static rand(to = 100) {
		return Math.floor(Math.random() * (to + 1))
	}
}

module.exports = Utils
