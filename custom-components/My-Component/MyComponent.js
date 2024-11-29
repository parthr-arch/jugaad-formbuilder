const Input = Formio.Components.components.input;

class MyComponent extends Input {
    /**
     * This is the default schema of your custom component. It will "derive"
     * from the base class "schema" and extend it with its default JSON schema
     * properties. The most important are "type" which will be your component
     * type when defining new components.
     *
     * @param extend - This allows classes deriving from this component to 
     *                 override the schema of the overridden class.
     */
    static schema(...extend) {
        return Input.schema({
            type: 'mycomp',
            label: 'My Component',
            key: 'mycomp',
        });
    }
    
    /**
     * This is the Form Builder information on how this component should show
     * up within the form builder. The "title" is the label that will be given
     * to the button to drag-and-drop on the buidler. The "icon" is the font awesome
     * icon that will show next to it, the "group" is the component group where
     * this component will show up, and the weight is the position within that
     * group where it will be shown. The "schema" field is used as the default
     * JSON schema of the component when it is dragged onto the form.
     */
    static get builderInfo() {
        return {
          title: 'My Component',
          icon: 'terminal',
          group: 'basic',
          documentation: '/userguide/#textfield',
          weight: 0,
          schema: MyComponent.schema()
        };
    }
    
    /**
     * Called when the component has been instantiated. This is useful to define
     * default instance variable values.
     *
     * @param component - The JSON representation of the component created.
     * @param options - The global options for the renderer
     * @param data - The contextual data object (model) used for this component.
     */
    constructor(component, options, data) {
        super(component, options, data);
    }
    
    /**
     * Called immediately after the component has been instantiated to initialize
     * the component.
     */
    init() {
        super.init();
    }
    
    /**
     * For Input based components, this returns the <input> attributes that should
     * be added to the input elements of the component. This is useful if you wish
     * to alter the "name" and "class" attributes on the <input> elements created
     * within this component.
     *
     * @return - A JSON object that is the attribute information to be added to the
     *           input element of a component.
     */
    get inputInfo() {
        const info = super.inputInfo;
        return info;
    }
    
    /**
     * This method is used to render a component as an HTML string. This method uses
     * the template system (see Form Templates documentation) to take a template
     * and then render this as an HTML string.
     *
     * @param content - Important for nested components that receive the "contents"
     *                  of their children as an HTML string that should be injected
     *                  in the {{ content }} token of the template.
     *
     * @return - An HTML string of this component.
     */
    render(content) {
        return super.render('<div ref="customRef">This is a custom component!</div>');
    }
    
    /**
     * The attach method is called after "render" which takes the rendered contents
     * from the render method (which are by this point already added to the DOM), and
     * then "attach" this component logic to that html. This is where you would load
     * any references within your templates (which use the "ref" attribute) to assign
     * them to the "this.refs" component variable (see comment below).
     *
     * @param - The parent DOM HtmlElement that contains the component template.
     *
     * @return - A Promise that will resolve when the component has completed the
     *           attach phase.
     */
    attach(element) {
        /**
         * This method will look for an element that has the 'ref="customRef"' as an
         * attribute (like <div ref="customRef"></div>) and then assign that DOM
         * element to the variable "this.refs". After this method is executed, the
         * following will point to the DOM element of that reference.
         *
         * this.refs.customRef
         *
         * For DOM elements that have multiple in the component, you would make this
         * say 'customRef: "multiple"' which would then turn "this.refs.customRef" into
         * an array of DOM elements.
         */
        this.loadRefs(element, {
          customRef: 'single',
        });
        
        /**
         * It is common to attach events to your "references" within your template.
         * This can be done with the "addEventListener" method and send the template
         * reference to that object.
         */
        this.addEventListener(this.refs.customRef, 'click', () => {
            // console.log('Custom Ref has been clicked!!!');        
        });
        return super.attach(element);
    }
    
    /**
     * Called when the component has been detached. This is where you would destroy
     * any other instance variables to free up memory. Any event registered with
     * "addEventListener" will automatically be detached so no need to remove them
     * here. 
     *
     * @return - A Promise that resolves when this component is done detaching.
     */
    detach() {
        return super.detach();
    }
 
    /**
     * Called when the component has been completely "destroyed" or removed form the
     * renderer.
     *
     * @return - A Promise that resolves when this component is done being destroyed.
     */
    destroy() {
        return super.destroy();
    }
 
    /**
     * A very useful method that will take the values being passed into this component
     * and convert them into the "standard" or normalized value. For exmample, this
     * could be used to convert a string into a boolean, or even a Date type.
     *
     * @param value - The value that is being passed into the "setValueAt" method to normalize.
     * @param flags - Change propogation flags that are being used to control behavior of the
     *                change proogation logic.
     *
     * @return - The "normalized" value of this component.
     */
    normalizeValue(value, flags = {}) {
        return super.normalizeValue(value, flags);
    }
    
    /**
     * Returns the value of the "view" data for this component.
     *
     * @return - The value for this whole component.
     */
    getValue() {
        return super.getValue();
    }
    
    /**
     * Much like "getValue", but this handles retrieving the value of a single index
     * when the "multiple" flag is used within the component (which allows them to add
     * multiple values). This turns a single value into an array of values, and this
     * method provides access to a certain index value.
     *
     * @param index - The index within the array of values (from the multiple flag) 
     *                that is getting fetched.
     *
     * @return - The view data of this index.
     */
    getValueAt(index) {
        return super.getValueAt(index);
    }
    
    /**
     * Sets the value of both the data and view of the component (such as setting the
     * <input> value to the correct value of the data. This is most commonly used
     * externally to set the value and also see that value show up in the view of the
     * component. If you wish to only set the data of the component, like when you are
     * responding to an HMTL input event, then updateValue should be used instead since
     * it only sets the data value of the component and not the view. 
     *
     * @param value - The value that is being set for this component's data and view.
     * @param flags - Change propogation flags that are being used to control behavior of the
     *                change proogation logic.
     *
     * @return - Boolean indicating if the setValue changed the value or not.
     */
    setValue(value, flags = {}) {
        return super.setValue(value, flags);
    }
    
    /**
     * Sets the value for only this index of the component. This is useful when you have
     * the "multiple" flag set for this component and only wish to tell this component
     * how the value should be set on a per-row basis.
     *
     * @param index - The index within the value array that is being set.
     * @param value - The value at this index that is being set.
     * @param flags - Change propogation flags that are being used to control behavior of the
     *                change proogation logic.
     *
     * @return - Boolean indiciating if the setValue at this index was changed.
     */
    setValueAt(index, value, flags = {}) {
        return super.setValueAt(index, value, flags);
    }
    
    /**
     * Similar to setValue, except this does NOT update the "view" but only updates
     * the data model of the component.
     *
     * @param value - The value of the component being set.
     * @param flags - Change propogation flags that are being used to control behavior of the
     *                change proogation logic.
     *
     * @return - Boolean indicating if the updateValue changed the value or not.
     */
    updateValue(value, flags = {}) {
        return super.updateValue(...args);
    }
}