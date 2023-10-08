class PercentageAmount {
    constructor(input, slider, prec = null, maxAmount = null) {
        th = this;
        
        this.input = input;
        this.slider = slider;
        
        this.slider.attr('min', '0')
                   .attr('max', '100')
                   .attr('step', '1');
        
        this.reset(prec, maxAmount);
        
        // Input -> slider
        this.input.onChange = function(val) {
            if(th.maxAmount === null)
                return;
            
            let perc = '0';
            
            if(val) {
                let amount = new BigNumber(val);
                perc = amount.dividedBy(th.maxAmount).multipliedBy(100).toFixed(0);
            }
            
            th.slider.val(perc).trigger('_input');
        });
    
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
    $('#withdraw-amount').on('prevalidated', function() {
        let amount = new BigNumber($(this).data('val'));
        if(amount.gt(window.wdAmountMax)) {
            $('#withdraw-amount, #withdraw-amount-max').addClass('blink-red');
            setTimeout(function() {
                $('#withdraw-amount, #withdraw-amount-max').removeClass('blink-red');
                
                let max = window.wdAmountMax.toString();
                $('#withdraw-amount').data('val', max)
                                    .val(max)
                                    .trigger('prevalidated');
            }, 1000);
        }
    });
    }
    
    reset(prec, maxAmount) {
        this.prec = prec;
        this.maxAmount = maxAmount;
        
        this.input.reset(prec);
        
        this.slider.val('0');
    }
}