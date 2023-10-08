class DecimalInput {
    constructor(input, prec = 0) {
        this.input = input;
        this.cbOnChange = new Array();
        this.cbRecalc = new Array();
        
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
                    valCandidate = valCandidate.substring(0, valCandidate.length - 1));
                else if(valCandidate.startsWith('.'))
                    valCandidate = '0' + valCandidate;
            }
            
            // Set real value
            th.set(valCandidate);
        });
        
        this.input.on('focusout', function() {
            th.updateVTS();
        });
    }
    
    get() {
        return this.valReal;
    }
    
    set(val, recalc = true) {
        // Perform all calculations
        if(recalc)
            for(const callback of this.cbRecalc)
                val = callback(val);
        
        this.valReal = val;
            
        if(this.input.not(':focus'))
            this.updateVTS();
        
        for(const callback of this.cbOnChange)
            callback(val);
    }
    
    onChange(callback) {
        this.cbOnChange.push(callback);
    }
    
    addRecalc(callback) {
        this.cbRecalc.push(callback);
    }
    
    updateVTS() {
        // Set visible and typing safe value to real value
        th.valTypingSafe = th.valReal;
        $(this).val(th.valReal);
    }
    
    reset(prec = null) {
        if(prec !== null)
            this.prec = prec;
        this.input.val('');
        this.valTypingSafe = '';
        this.valReal = null;
    }
}