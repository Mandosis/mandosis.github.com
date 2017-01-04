import { Route } from './route';

/**
 * Client-side router for single page applications
 */
export class Router {
    private _routes: Array<Route> = [];

    /**
     * @param routes Array of routes
     */
    constructor(routes: Array<{ path: string, template?: string, templateUrl?: string }>) {
        for (let route of routes) {
            this._routes.push(new Route(route));
        }

        this._bootstrapNavigation();
        this._addRouterLinkClickEvents();
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

            if (path.charAt(0) === '#') {
                path = path.slice(1, path.length);
            }


            if (path.charAt(0) !== '/') {
                path = `/${path}`;
            }

            if (path === route.path) {
                let state = {
                    Page: path,
                    Url: path
                }

                let urlWithBaseHref = this._getAndAppendBaseHref(state.Url);
                
                history.pushState(state, state.Page, urlWithBaseHref);
                this._addTemplateToDom(route);
                return true;
            }
        }
        
        this.navigate(this._routes[0].path);
        console.error(`Router: Path '${path}' does not exist.`);
        return false;
    }

    /**
     * Gets and appends the base href value if it exists
     * 
     * @param url       URL for route
     * @return          modified url adjusted for base tag if it exists
     */
    private _getAndAppendBaseHref(url: string): string {
        let baseHref = this._baseHrefValue;

        if (baseHref && baseHref !== '/') {
            return baseHref + url;
        }

        if (baseHref && baseHref === '/') {
            return url;
        }
        
        return '#' + url; 
    }

    /**
     * Get value of of the href attribute in the base tag if it exists
     * 
     * @returns Value of href attributes
     */
    private get _baseHrefValue(): string {
        let baseElement: HTMLElement = document.getElementsByTagName('base')[0];
        let baseHref: string;

        if (baseElement) {
            return baseElement
                .attributes
                .getNamedItem('href')
                .value;
        }
    }

    private get _routerOutletElement(): Element {
        return document.getElementsByTagName('router-outlet')[0];
    }

    /**
     * Get template html and inject into dom
     * 
     * @param route Route to render
     */
    private _addTemplateToDom(route: Route): void {
        this._getTemplateHtml(route)
            .then((templateHtml: string) => {

                if (!this._routerOutletElement) {
                    console.error(`Router: 'router-outlet' missing. Unable to load template.`);
                    return false;
                }

                this._routerOutletElement.innerHTML = templateHtml;
                this._addRouterLinkClickEvents(true);
            })
            .catch((err) => {
                console.error(`Router: Unable to get html for route '${route.path}'.\n${err}`);
            });
    }

    /**
     * Get HTML for template
     * 
     * @param route Route to get HTML for.
     */
    private _getTemplateHtml(route: Route): Promise<any> {
        return new Promise((resolve, reject) => {

            if (route.template && !route.templateUrl) {
                return resolve(route.template);
            }

            window.fetch(route.templateUrl)
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
     * 
     * @param outletOnly Only add click events to routerLinks in the 'router-outlet'.
     */
    private _addRouterLinkClickEvents(outletOnly?: boolean) {
        let nodeList: NodeList;
        if (outletOnly) {
            nodeList = this._routerOutletElement.querySelectorAll('[routerLink]');
        } else {
            nodeList = document.querySelectorAll('[routerLink]');
        }

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


    /**
     * Load the correct route on initial page load
     * 
     * @returns Success of navigation
     */
    private _bootstrapNavigation(): boolean {
        if (this._baseHrefValue) {
            let location = window.location.pathname;

            location = location.substring(
                this._baseHrefValue.length,
                location.length
            );
            return this.navigate(location);
        }

        return this.navigate(window.location.hash);
    }

    /**
     * Gets current state of router
     */
    public get state() {
        return history.state;
    }
}