import { Router, Route } from './lib/router';

let routes = new Router([
    {
        path: 'home',
        // partial: `<h1>Home</h1>`,
        partialUrl: 'index.html'
    }
]);

export { routes };