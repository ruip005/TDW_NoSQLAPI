module.exports = (req, res, next) => {
    console.log(`Requisição: ${req.method} ${req.url} [ ${req.ip} ] - ${new Date()}`);
    next();
  };