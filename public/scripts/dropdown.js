$( document ).ready(function() {
    var CheckboxDropdown = function (el) {
        var _this           = this;
        this.isOpen         = false;
        this.areAllChecked  = false;
        this.$el            = $(el);
        this.$label         = this.$el.find(".mdc-select__selected-text");
        this.$inputs        = this.$el.find("[type='checkbox']");
        this.$dropdown      = this.$el.find(".mdc-select__anchor")
        this.$floatinglabel = this.$el.find(".mdc-floating-label")
        this.onCheckBox();

        // Add Event Handlers
        
        this.$label.on("click", function(e) {
            e.preventDefault();
            _this.toggleOpen();
        })

        this.$inputs.on("change", function(e) {
            _this.onCheckBox();
        })
    }

    CheckboxDropdown.prototype.onCheckBox = function() {
        this.updateStatus();
    }

    CheckboxDropdown.prototype.updateStatus = function() {
        var checked = this.$el.find(":checked");

        this.areAllChecked = false;

        if(checked.length <= 0) {
            if(this.isOpen){
                $(this.$label).css("color", "#BCBCBC")
                this.$label.html("Selecione um ou mais");
            } else {
                this.$label.html("");
            }
        } else if (checked.length === 1) {
            $(this.$label).css("color", "#232323")
            this.$label.html(checked.parent().parent("label").find(".dropdown-option-label").text());
        } else {
            $(this.$label).css("color", "#232323")
            var categories = [];
            var values = "";

            for(let i = 0; i < checked.length; i++){
                categories.push($(checked[i]).parent().parent("label").find(".dropdown-option-label").text());
                if(i == checked.length - 1) {
                    var val = $(checked[i]).parent().parent("label").find(".dropdown-option-label").text();
                    values += val;
                } else {
                    var val = $(checked[i]).parent().parent("label").find(".dropdown-option-label").text()+", ";
                    values += val;
                }
            }

            this.$label.html(values);
            $( "#selectCategories").trigger( "valueHasChanged", {categories: categories} );
        }
    }

    CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
        var _this = this;
        if(!this.isOpen || forceOpen) {
            this.isOpen = true;
            this.$el.addClass("on").addClass("mdc-select--focused").addClass("mdc-select--activated");
            this.$floatinglabel.addClass("mdc-floating-label--float-above")
            $(this.$floatinglabel).css("background","#FFFFFF")
            $(this.$floatinglabel).css("padding-left","5px")
            $(this.$floatinglabel).css("padding-right","5px")
            this.updateStatus()
        } else {
            this.isOpen = false;
            this.$el.removeClass("on").removeClass("mdc-select--focused").removeClass("mdc-select--activated");
            if(this.$el.find(":checked").length == 0 ){
                this.$floatinglabel.removeClass("mdc-floating-label--float-above")
            }
            $(this.$floatinglabel).css("padding-left","0px")
            $(this.$floatinglabel).css("padding-right","0px")
            this.updateStatus()
        }
    }

    var checkboxesDropdowns = document.querySelectorAll(
        '[data-control="checkbox-dropdown"]'
    );

    for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
        new CheckboxDropdown(checkboxesDropdowns[i])
    }

        
   

})