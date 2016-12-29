export class Route {
    path: string;
    partial: string;
    partialUrl: string;

    /**
     * @param path          Relative url to base.
     * @param partial       HTML code to render.
     * @param partialUrl    Url to partial html file.
     */
    constructor(route: { path: string, partial?: string, partialUrl?: string }) {
        let errors: boolean = false;

        if (route.path) {
            this.path = route.path;
        } else {
            errors = true;
            console.error(`Error (Router): No path provided.`);
        }
        
        if (route.partialUrl && !route.partial) {
            this.partialUrl = route.partialUrl;
        } else if (route.partial && !route.partialUrl) {
            this.partial = route.partial;
        } else {
            errors = true;
            console.error(`Error (Router): Parital missing or both the partialUrl and partial are set.`);
        }
    }
}