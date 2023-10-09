class DecimalInput {
    constructor(input, prec = 0) {
        let th = this;
        
        this.input = input;
        this.cbOnChangeChained = new Array();
        this.cbOnChangeUnchained = new Array();
        this.cbOnUpdateVisible = new Array();
        this.chain = false;
        
        this.reset(prec);
        
        this.input.on('input', function () {
            let regex = new RegExp("^[0-9]*(\\.[0-9]{0," + th.prec + "})?$");
            let valVisible = $(this).val();
            
            // If illegal format after change, revert to typing safe value
            if (!regex.test(valVisible)) {
                $(this).val( th.valTypingSafe );
                return;
            }
            
            // Set typing safe value to visible value
            th.valTypingSafe = valVisible;
            
            // Prepare candidate value
            let valCandidate = valVisible == '' ? null : valVisible;
            if(valCandidate) {
                if(valCandidate.slice(-1) == '.')
                    valCandidate = valCandidate.substring(0, valCandidate.length - 1);
                else if(valCandidate.startsWith('.'))
                    valCandidate = '0' + valCandidate;
            }
            
            // Set real value
            th.set(valCandidate, true);
        });
        
        this.input.on('focusout', function() {
            th.updateVTS();
        });
    }
    
    get() {
        return this.valReal;
    }
    
    set(val, chained) {
        if(chained) {
            if(this.chain)
                throw 'DecimalInput infinite chain reaction ! ! !';
            this.chain = true;
            for(const callback of this.cbOnChangeChained)
                callback(val);
            this.chain = false;
        }
        
        this.valReal = val;
        
        if(this.chain)
            return;
            
        if(this.input.not(':focus'))
            this.updateVTS();
        
        for(const callback of this.cbOnChangeUnchained)
            callback(val);
    }
    
    onChange(callback, chained) {
        if(chained)
            this.cbOnChangeChained.push(callback);
        else
            this.cbOnChangeUnchained.push(callback);
    }
    
    onUpdateVisible(callback) {
        this.cbOnUpdateVisible.push(callback);
    }
    
    updateVTS() {
        // Set visible and typing safe value to real value
        let str = this.valReal ? this.valReal : '';
        
        this.valTypingSafe = str;
        this.input.val(str);
        
        for(const callback of this.cbOnUpdateVisible)
            callback(this.realVal);
    }
    
    reset(prec = null) {
        if(prec !== null)
            this.prec = prec;
        this.input.val('');
        this.valTypingSafe = '';
        this.valReal = null;
    }
}