export class EndpointMatcher extends RegExp {
    private static pattern = /{(.*?)}/g;

    private static convertToEndpointConfig(endpointConfig: string): string {
        let result, regexStr = endpointConfig;
        while ((result = EndpointMatcher.pattern.exec(endpointConfig)) !== null) {
            switch ((result[1].split(':')[1]).trim()) {
                case 'number':
                    regexStr = regexStr.replace(result[0], '([0-9]{1,})');
                    break;
                case 'string':
                    regexStr = regexStr.replace(result[0], '([0-9a-zA-Z\\-]{1,})');
                    break;
            }
        }
        return `^${regexStr}$`;
    }

    constructor(private endpointConfig: string) {
        super(EndpointMatcher.convertToEndpointConfig(endpointConfig));
    }

    params = (endpoint: string): any => {
        const keys = [];

        let match, results = [],
            values: any[] = this.test(endpoint) ? this.exec(endpoint).slice(1) : [];

        while((match = EndpointMatcher.pattern.exec(this.endpointConfig)) !== null) {
            keys.push(match[1].split(':')[0].trim());
        }

        values = values.map(value => (/^[0-9]{1,}$/.test(value) ? parseInt(value) : value));

        for(let x=0; x < keys.length; x++) {
            results.push({
                key: keys[x],
                value: values[x]
            });
        }
        return results;
    }
}