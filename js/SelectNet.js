class SelectNet extends Select {
    constructor(target, endpoint, onChange = null, autoSelect = false) {
        super(
            target,
            endpoint,
            'networks',
            'Select network...',
            true,
            onChange,
            autoSelect
        );
    }
    
    render(data) {
        return `
            <div class="selector-item row p-1 hoverable" data-id="${data.symbol}" data-val="${data.description}">
                <div class="col-auto my-auto text-center" style="width: 32px">
                    <img width="24px" height="24px" src="${data.iconUrl}">
                </div>
                <div class="col my-auto">
                    ${data.description}
                </div>
            </div>
        `;
    }
}