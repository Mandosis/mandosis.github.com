export class Route {
    path: string;
    template: string;
    templateUrl: string;

    /**
     * @param path          Relative url to base.
     * @param template       HTML code to render.
     * @param templateUrl    Url to template html file.
     */
    constructor(route: { path: string, template?: string, templateUrl?: string }) {
        if (route.path) {
            if (route.path.charAt(0) !== '/') {
                route.path = `/${route.path}`;
            }

            this.path = route.path;
        } else {
            console.error(`Router: No path provided.`);
        }
        
        if (route.templateUrl && !route.template) {
            this.templateUrl = route.templateUrl;
        } else if (route.template && !route.templateUrl) {
            this.template = route.template;
        } else {
            console.error(`Router: Parital missing or both the templateUrl and template are set.`);
        }
    }
}