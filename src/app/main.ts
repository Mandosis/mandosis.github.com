require('../styles/main.scss');

import { Router } from './lib/router';

let router = new Router([
    {
        path: '/',
        template: require('../templates/_home.html')
    },
    {
        path: 'projects',
        template: require('../templates/_projects.html')
    },
    {
        path: 'work',
        template: require('../templates/_work.html')
    },
    {
        path: 'about',
        template: require('../templates/_about.html'),
    }
]);

console.log(router.state);