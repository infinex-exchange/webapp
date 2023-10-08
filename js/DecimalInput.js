class DecimalInput {
    constructor(input, prec = 0, onChange = null, recalc = null) {
        this.input = input;
        this.onChange = onChange;
        this.recalc = recalc;
        
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
        if(recalc && th.recalc)
            this.valReal = this.recalc(val);
        else
            this.valReal = val;
            
        if(this.input.not(':focus'))
            this.updateVTS();
        
        if(this.onChange)
            this.onChange(val);
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