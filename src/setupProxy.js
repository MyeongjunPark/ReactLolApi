const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/lol",
    createProxyMiddleware({
      target: "https://kr.api.riotgames.com",
      changeOrigin: true,
    })
  );
};
