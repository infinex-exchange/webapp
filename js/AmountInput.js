class AmountInput {
    constructor(input, prec = 0) {
        this.input = input;
        this.mapOnChange = {};
        
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
            
            // Prepare real value candidate
            th.valCandidate = valVisible;
            
            // 1. Drop . on last position
            if(th.valCandidate.slice(-1) == '.')
                th.valCandidate = th.valCandidate.substring(0, th.valCandidate.length - 1));
        
            // 2. Change . to 0. on first position
            else if(th.valCandidate.startsWith('.')) {
                th.valCandidate = '0' + th.valCandidate;
            }
            
            // Do calculations
            for(const callback of th.onChangeUser)
                callback(th.valCandidate == '' ? null : th.valCandidate);
            
            // Resolve real value
            th.resolveRealVal();
        });
        
        this.input.on('focusout', function() {
            th.resolveVTSVal();
        });
    }
    
    set(val, immediate = false) {
        // Set pending value
        // If no focus or immediate = true, apply it immediately
        // Otherwise, it will be applied on lost focus
        
        this.valPending = val;
        this.resolveRealVal();
        
        if(immediate || this.input.not(':focus'))
            this.resolveVTSVal();
    }
    
    get() {
        return this.valReal == '' ? null : this.valReal;
    }
    
    resolveRealVal() {
        // Set real value to:
        // - pending real value if exists
        // - candidate value otherwise
        if(th.valPending !== null)
            th.valReal = th.valPending;
        else
            th.valReal = th.valCandidate;
        
        for(const callback of th.onChangeAny)
            callback(th.get());
    }
    
    resolveVTSVal() {
        // Set visible and typing safe value to real value
        // Destroy pending real value if exists
        th.valTypingSafe = th.valReal;
        $(this).val(th.valReal);
        
        th.valPending = null;
    }
    
    reset(prec = null) {
        if(prec !== null)
            this.prec = prec;
        this.input.val('');
        this.valTypingSafe = '';
        this.valCandidate = '';
        this.valPending = null;
        this.valReal = '';
    }
    
    onChange(context, callback) {
        this.mapOnChange[context] = callback;
    }
}