// scripts/bundle-plotly.js
import Plotly from 'plotly.js/lib/core';


import scatter from 'plotly.js/lib/scatter';
import pie from 'plotly.js/lib/pie';
import bar from 'plotly.js/lib/bar';


Plotly.register([
    scatter,
    pie,
    bar,
]);

export default Plotly;