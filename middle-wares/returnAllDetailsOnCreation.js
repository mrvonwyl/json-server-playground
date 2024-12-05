const returnAllDetailsOnCreation = (req, res, next) => {
  const { path, method } = req;

  const isPath = /^\/lerbgruppen\/\d+\/details$/.test(path);

  console.log(path, isPath);

  if (isPath) {
    console.log("isPath");
  }

  next();
};

module.exports = [returnAllDetailsOnCreation];
