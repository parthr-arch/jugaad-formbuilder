// StarRatingComponent.js
(function () {
  const FieldComponent = Formio.Components.components.field;

  class StarRatingComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'starrating',
        label: 'Star Rating',
        key: 'starrating',
        inputType: 'number',
        input: true,
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Star Rating',
        group: 'basic',
        icon: 'star',
        weight: 70,
        schema: StarRatingComponent.schema(),
      };
    }

    get defaultSchema() {
      return StarRatingComponent.schema();
    }

    render() {
      const stars = Array(5).fill(0).map((_, i) => {
        const filled = i < this.dataValue ? 'filled' : 'empty';
        return `<span class="star ${filled}" data-value="${i + 1}">★</span>`;
      }).join('');
      return super.render(`<div class="star-rating">${stars}</div>`);
    }

    attach(element) {
      super.attach(element);
      this.refs = { stars: element.querySelectorAll('.star') };
      this.refs.stars.forEach(star => {
        star.addEventListener('click', (event) => {
          const rating = parseInt(event.target.getAttribute('data-value'));
          this.setValue(rating);
        });
      });
      return element;
    }

    setValue(value) {
      super.setValue(value);
      this.updateStars(value);
    }

    updateStars(value) {
      this.refs.stars.forEach((star, index) => {
        if (index < value) {
          star.classList.add('filled');
        } else {
          star.classList.remove('filled');
        }
      });
    }
  }

  // Register the custom component in Form.io
  Formio.Components.addComponent('starrating', StarRatingComponent);
})();
