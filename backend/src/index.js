const path = require('path');
require('module-alias/register');

const moduleAlias = require('module-alias');
moduleAlias.addAlias('@shared', path.join(__dirname, '../../shared'));
moduleAlias.addAlias('@entities', path.join(__dirname, './entities'));
moduleAlias.addAlias('@assets', path.join(__dirname, './assets'));