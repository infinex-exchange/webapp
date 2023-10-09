class PercentageAmount {
    constructor(input, slider, prec = null, maxAmount = null) {
        let th = this;
        
        this.input = input;
        this.slider = slider;
        
        this.slider.attr('min', '0')
                   .attr('max', '100')
                   .attr('step', '1');
        
        this.reset(prec, maxAmount);
        
        // Input -> slider
        this.input.onChange(
            function(val) {
                if(th.maxAmount === null)
                    return;
            
                let perc = '0';
            
                if(val) {
                    let amount = new BigNumber(val);
                    perc = amount.dividedBy(th.maxAmount).multipliedBy(100).toFixed(0);
                }
            
                th.slider.val(perc).trigger('_input');
            },
            false
        );
    
        // Slider -> input
        this.slider.on('input', function() {
            if(th.maxAmount === null)
                return;
            
            let amount = th.maxAmount
                .multipliedBy( $(this).val() )
                .dividedBy(100)
                .dp(th.prec)
                .toString();
            
            th.input.set(amount, true);
        });
    
        // Drop amount to available balance
        this.input.onChange(
            function(val) {
                if(th.maxAmount === null)
                    return;
                
                let bnVal = new BigNumber(val);
                if(bnVal.gt(th.maxAmount))
                    th.input.set(
                        th.maxAmount
                          .dp(th.prec, BigNumber.ROUND_DOWN)
                          .toString(),
                        false
                    );
            
                th.input.input.addClass('text-red');
            },
            true
        );
        this.input.onUpdateVisible(function() {
            th.input.input.removeClass('text-red');
        });
    }
    
    reset(prec, maxAmount) {
        this.prec = prec;
        this.maxAmount = maxAmount;
        
        this.input.reset();
        
        this.slider.val('0');
    }
}