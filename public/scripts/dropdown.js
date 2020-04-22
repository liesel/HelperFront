$( document ).ready(function() {
    var CheckboxDropdown = function (el) {

        var _this = this;

        this.isOpen = false;
        this.areAllChecked = false;
        this.$el = $(el);
        this.$label = this.$el.find(".mdc-select__selected-text");
        this.$inputs = this.$el.find("[type='checkbox']");
        this.$dropdown = this.$el.find(".mdc-select__anchor");
        this.$floatinglabel = this.$el.find(".mdc-floating-label");
        
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

        var values = "";
        var categories = [];

        if (checked.length === 1) {
            var checkbox = checked.parent().parent("label").find("[type='checkbox']");
            values = checkbox.attr('value');

            categories.push(checkbox.attr('value'));
            $( "#selectCategories").trigger( "valueHasChanged", {categories: categories} );

            $(this.$label).css("color", "#232323");

        } else if(checked.length > 1) {

            for(let i = 0; i < checked.length; i++){
                
                var checkbox = $(checked[i]).parent().parent("label").find("[type='checkbox']");

                categories.push(checkbox.attr('value'));

                if(i == checked.length - 1) {
                    values += checkbox.attr('value');
                } else {
                    values += checkbox.attr('value') + ", ";
                }
            }

            $( "#selectCategories").trigger( "valueHasChanged", {categories: categories} );
            $(this.$label).css("color", "#232323");
        }

        this.$label.html(values);
        this.reset();
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
        } else {
            this.isOpen = false;
            this.$el.removeClass("on").removeClass("mdc-select--focused").removeClass("mdc-select--activated");
            if(this.$el.find(":checked").length == 0 ){
                this.$floatinglabel.removeClass("mdc-floating-label--float-above")
            }
            $(this.$floatinglabel).css("padding-left","0px")
            $(this.$floatinglabel).css("padding-right","0px")
        }
        this.reset()
    }

    CheckboxDropdown.prototype.reset = function(){
        var checked = this.$el.find(":checked");

        if(checked.length <= 0) {
            if(this.isOpen){
                $(this.$label).css("color", "#BCBCBC")
                this.$label.html("Selecione um ou mais");
            } else {
                this.$label.html("");
            }
        }
    }

    var checkboxesDropdowns = document.querySelectorAll(
        '[data-control="checkbox-dropdown"]'
    );

    for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
        new CheckboxDropdown(checkboxesDropdowns[i])
    }

})