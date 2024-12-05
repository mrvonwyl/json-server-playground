const returnAllDetailsOnCreation = (req, res, next) => {
  const { path, method } = req;
  const isPath = /^\/lerbgruppen\/\d+\/details$/.test(path);

  if (isPath && method === "POST") {
    const originalSend = res.send;

    res.send = function (body) {
      console.log("SEEEEND!");

      const json = JSON.parse(body);

      if (!Array.isArray(json)) {
        const db = req.app.db;

        if (!db) {
          console.error("Database access failed");
          return originalSend.call(this, { error: "Database not available" });
        }

        // Query the database for all details for the given `lerbgruppeId`
        const id = path.split("/")[2];
        const lerbgruppeDetails = db
          .get("details")
          .filter({ lerbgruppenId: id })
          .value();

        return originalSend.call(this, lerbgruppeDetails);
      }

      return originalSend.call(this, body);
    };
  }

  next();
};

module.exports = [returnAllDetailsOnCreation];
