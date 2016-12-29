import { Router, Route } from './lib/router';

let routes = new Router([
    {
        path: '/',
        partial: `<h1>Home</h1><p>This is the home page.</p>`
    },
    {
        path: 'about',
        partial: `<h1>About</h1><p>This is the about page. It turns out I am actually human.</p>`
        // partialUrl: 'index.html'
    }
]);
