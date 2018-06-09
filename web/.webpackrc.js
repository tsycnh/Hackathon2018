const path = require('path');

export default {
    entry: 'src/index.js',
    extraBabelPlugins: [
        ['import', { "libraryName": "antd", style: "css" }],
    ], 
    alias: {
        components: path.resolve(__dirname, 'src/components/'),
    }
};
