const router = require('express').Router();
const pratosController = require('../Controllers/pratos');

router.post('/create', pratosController.create);
router.get('/all', pratosController.all);
router.put('/edit/:id', pratosController.edit);
router.delete('/delete/:id', pratosController.delete);

module.exports = router;