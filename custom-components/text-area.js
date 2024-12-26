(function () {
    const TextareaComponent = Formio.Components.components.textarea;
  
    class ExtendedTextareaComponent extends TextareaComponent {
      static schema(...extend) {
        return TextareaComponent.schema({
          type: 'extendedtextarea',
          label: 'Extended Textarea',
          key: 'extendedtextarea',
          personalInfo: false, // Default for Personal Info checkbox
          lineworksTeamsLinkage: false, // Default for LINE WORKS/Teams Linkage checkbox
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'Extended Textarea',
          group: 'basic',
          icon: 'font',
          weight: 20,
          schema: ExtendedTextareaComponent.schema(),
        };
      }
  
      constructor(component, options, data) {
        super(component, options, data);
      }
  
      static editForm(...extend) {
        // Get the default edit form for the Textarea component
        const editForm = TextareaComponent.editForm(...extend);
  
        // Find the "Display" tab and inject the new checkboxes
        const displayTab = editForm.components.find((tab) => tab.key === 'display');
        if (displayTab) {
          displayTab.components.push(
            {
              type: 'checkbox',
              input: true,
              key: 'personalInfo',
              label: 'Personal Info',
              tooltip: 'Check this if the textarea is for personal information.',
              weight: 100,
            },
            {
              type: 'checkbox',
              input: true,
              key: 'lineworksTeamsLinkage',
              label: 'LINE WORKS/Teams Linkage',
              tooltip: 'Enable LINE WORKS or Teams integration for this textarea.',
              weight: 101,
            }
          );
        }
  
        return editForm;
      }
    }
  
    // Register the extended component
    Formio.Components.addComponent('extendedtextarea', ExtendedTextareaComponent);
  })();
  