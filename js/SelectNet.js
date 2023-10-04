class SelectNet extends Select {
    constructor(target, endpoint, onChange = null, autoSelect = false, autoSelectSingle = false) {
        super(
            target,
            endpoint,
            'networks',
            'Select network...',
            false,
            onChange,
            autoSelect,
            autoSelectSingle
        );
    }
    
    render(data) {
        return `
            <div class="selector-item row p-1 hoverable" data-id="${data.symbol}" data-val="${data.name}">
                <div class="col-auto my-auto text-center" style="width: 32px">
                    <img width="24px" height="24px" src="${data.iconUrl}">
                </div>
                <div class="col my-auto">
                    ${data.name}
                </div>
            </div>
        `;
    }
}