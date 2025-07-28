function myTemplate(styles, ...configs) {
    styles = styles.join('')
    
    styles = styles.trim();
    styles = styles.replace(/\n( )*/g, '');
    
    styles = styles.split(';');
    styles.pop();
    styles = styles.map((style) => style.trim())

    configs.reverse()

    return (props) => {
        const appliedStyles = {};
        for (let style of styles) {
            style = style
                .trim()
                .replace(/(\n| )/g, '')

            if (style.endsWith(':')) {
                style = style.replace(':', '');
                appliedStyles[style] = configs.pop()(props)
            } else {
                const [name, value] = style.split(':');
                appliedStyles[name] = value;
            }
        }
        return appliedStyles
    };
}

const template = myTemplate`
    background-color: ${({ invalid }) => invalid ? 'red' : 'blue'};
    color: black;
    border-color: ${({ invalid }) => invalid ? 'green' : 'yellow'};
`
console.log(template({ invalid: true }))
