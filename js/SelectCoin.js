class SelectCoin extends Select {
    constructor(target, endpoint, onChange = null, autoSelect = false) {
        super(
            target,
            endpoint,
            'assets',
            'Select coin...',
            true,
            onChange,
            autoSelect
        );
    }
    
    render(data) {
        return `
            <div class="selector-item row p-1 hoverable" data-id="${data.asset}" data-val="${data.name}">
                <div class="col-auto my-auto text-center" style="width: 32px">
                    <img width="24px" height="24px" src="${data.iconUrl}">
                </div>
                <div class="col my-auto">
                    <strong>${data.asset}</strong>
                    <span class="secondary">${data.name}</span>
                </div>
            </div>
        `;
    }
}