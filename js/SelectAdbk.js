class SelectAdbk extends Select {
    constructor(target, endpoint, onChange = null) {
        super(
            target,
            endpoint,
            'addresses',
            'Paste address or select from address book...',
            true,
            onChange,
            false,
            false,
            null,
            true
        );
    }
    
    render(data) {
        let memoHtml = '';
        if(typeof(data.memo) !== 'undefined' && data.memo !== null &&
           typeof(data.memoName) !== 'undefined' && data.memoName !== null) {
            memoHtml = `
                <br>
                <h6 class="d-inline secondary">
                    ${data.memoName}:
                </h6>
                <small>
                    ${data.memo}
                </small>
            `;
        }
        
        return `
            <div class="selector-item row p-1 hoverable" data-id="${data.adbkid}" data-val="${data.address}">
                <div class="col-12">
                    <h5 class="secondary">${data.name}</h5>
                    ${data.address}
                    ${memoHtml}
                </div>
            </div>
        `;
    }
}