const { Products } = require("../db.js");

const ofertSelect = (req, res) => {
  let { id_oferta, id_destacado, porcentaje } = req.body;

  var array = id_oferta;
  try {
    if (array.length !== 0) {
      var Promises = [];
      array.forEach((e) => {
        var newPromise = Products.update(
          { inOferta: true },
          { where: { id: e } }
        );
        Promises.push(newPromise);
      });
      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }
    var value_porcentaje = porcentaje;
    if (value_porcentaje.length !== 0) {
      var Promises = [];
      var newPromise = Products.update(
        { porcentaje: value_porcentaje },
        { where: { id: array } }
      );
      Promises.push(newPromise);

      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }

    var arrayDestacado = id_destacado;
    //me llega un array de numeros en string
    if (arrayDestacado.length !== 0) {
      var Promises = [];
      arrayDestacado.forEach((e) => {
        var newPromise = Products.update(
          { inDestacados: true },
          { where: { id: e } }
        );
        Promises.push(newPromise);
      });
      Promise.all(Promises).then((result) => {
        result.forEach((r) => console.log(r));
      });
    }

    res.status(200).send({ message: "La información ha sido actualizada." });
  } catch (err) {
    console.log(err, "error en la actualizacion");
    res.send({ message: err.message });
  }
};

module.exports = {
  ofertSelect,
};
