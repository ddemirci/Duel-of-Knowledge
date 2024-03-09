const path = require('path');

// Set up path alias for shared resources
require('module-alias/register');
require('module-alias').addAlias('@shared', path.join(__dirname, '../../shared'));