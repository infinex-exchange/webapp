class DecimalInput {
    constructor(input) {
        let th = this;
        
        this.input = input;
        
        this.cbOnChangeChained = new Array();
        this.cbOnChangeUnchained = new Array();
        this.cbOnChangeUncRepeat = new Array();
        this.cbOnUpdateVisible = new Array();
        this.chain = false;
        this.prec = null;
        
        this.reset();
        
        this.input.on('input', function () {
            if(th.prec === null)
                return;
            
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
        let old = this.valReal;
        this.valReal = val;
        
        if(chained) {
            if(this.chain)
                throw 'DecimalInput infinite chain reaction ! ! !';
            this.chain = true;
            for(const callback of this.cbOnChangeChained)
                callback(this.valReal);
            this.chain = false;
        }
        
        if(this.chain)
            return;
            
        if(! this.input.is(':focus'))
            this.updateVTS();
        
        for(const callback of this.cbOnChangeUncRepeat)
            callback(this.valReal);
        
        if(this.valReal === old)
            return;
        
        for(const callback of this.cbOnChangeUnchained)
            callback(this.valReal);
    }
    
    onChange(callback, chained, unchainedRepeat = false) {
        if(chained)
            this.cbOnChangeChained.push(callback);
        else if(!unchainedRepeat)
            this.cbOnChangeUnchained.push(callback);
        else
            this.cbOnChangeUncRepeat.push(callback);
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
            callback(this.valReal);
    }
    
    setPrec(prec) {
        this.prec = prec;
        this.reset();
    }
    
    reset(prec = null) {
        this.input.val('');
        this.valTypingSafe = '';
        this.valReal = null;
    }
}