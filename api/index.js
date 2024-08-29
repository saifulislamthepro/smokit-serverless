
const dashboardRoutes = require('./dashboardRoutes');
const cartRoutes = require("./cartRoutes");
const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');
const pageRoutes = require('./pageRoutes');


// Serve pages
app.use( pageRoutes);
app.use( dashboardRoutes);
app.use( cartRoutes);
app.use( authRoutes);
app.use( orderRoutes);

module.exports = router;