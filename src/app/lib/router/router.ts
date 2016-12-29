import { Route } from './route';

/**
 * Client-side router for single page applications
 */
export class Router {
    private _routes: Array<Route> = [];

    /**
     * @param routes Array of routes
     */
    constructor(routes: Array<{ path: string, partial?: string, partialUrl?: string }>) {
        for (let route of routes) {
            this._routes.push(new Route(route));
        }

        this.navigate(window.location.pathname);
        this._addRouterLinkEventListeners();
    }


    /**
     * Navigate to new path
     * 
     * @param path Path to navigate to.
     * @returns Success of navigation.
     */
    public navigate(path: string): boolean {
        path = path.trim();

        for (let route of this._routes) {
            if (path.charAt(0) !== '/') {
                path = `/${path}`;
            }

            if (path === route.path) {
                let obj = {
                    Page: path,
                    Url: path
                }

                history.pushState(obj, obj.Page, obj.Url);
                this._renderPartial(route);
                return true;
            }
        }
        
        this.navigate(this._routes[0].path);
        console.error(`Router: Path '${path}' does not exist.`);
        return false;
    }

    /**
     * Get partial and inject into dom
     * 
     * @param partial URL or HTML string.
     * @param file Is the partial a file.
     */
    private _renderPartial(route: Route): void {
        this._getPartialHtml(route)
            .then((partialHtml: string) => {
                let routerElement = document.getElementsByTagName('router-outlet')[0];

                if (!routerElement) {
                    console.error(`Router: 'router-outlet' missing. Unable to load partial.`);
                    return false;
                }

                routerElement.innerHTML = partialHtml;
            })
            .catch((err) => {
                console.error(`Router: Unable to get html for route '${route.path}'.\n${err}`);
            });
    }

    /**
     * Get HTML for partial
     * 
     * @param route Route to get HTML for.
     */
    private _getPartialHtml(route: Route): Promise<any> {
        return new Promise((resolve, reject) => {

            if (route.partial && !route.partialUrl) {
                return resolve(route.partial);
            }

            window.fetch(route.partialUrl)
                .then((response) => {
                    return response.text();
                })
                .then((body: string) => {
                    return resolve(body);
                })
                .catch((err: string) => {
                    return reject(err);
                });
        });
    }

    /**
     * Add click event listeners to elements containing the 'routerLink'
     * attribute to navigate to a new route.
     */
    private _addRouterLinkEventListeners() {
        let nodeList: NodeList = document.querySelectorAll('[routerLink]');

        // Convert Node List to Array of HTML Elements
        let elementList: Array<HTMLElement> = Array.prototype.slice.call(nodeList);

        let eventAction = () => {
            let route = event
                .srcElement
                .attributes
                .getNamedItem('routerLink')
                .value;

            this.navigate(route);
        }

        for (let element of elementList) {
            element.addEventListener('click', eventAction);
        }
    }
}