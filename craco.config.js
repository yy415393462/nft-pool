module.exports = {
    // ...
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }], //装饰器
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true
                }
            ]
        ]
    }
};