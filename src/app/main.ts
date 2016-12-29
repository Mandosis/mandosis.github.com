import { routes } from './routes';

let link = document.getElementsByClassName('router-link')[0];

link.addEventListener('click', () => {
    console.log('click');
    routes.navigate('home');
});