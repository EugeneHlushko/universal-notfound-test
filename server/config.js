const { NODE_ENV, PORT = 3000 } = process.env;

const config = {

    default: {
        port: parseInt(PORT, 10),
        locales: [ 'en', 'ru' ]
    },

    development: {

    },

    staging: {

    },

    production: {
        port: 3010
    }

};

export default config[NODE_ENV]
    ? { ...config.default, ...config[NODE_ENV] }
    : { ...config.default, ...config.development };