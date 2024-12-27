(function () {
    const FieldComponent = Formio.Components.components.field;
  
    class JapaneseNameComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'japaneseName',
          label: 'Japanese Name Translator',
          key: 'japaneseName',
          input: true,
          components: [
            {
              label: 'Family Name',
              key: 'familyName',
              type: 'textfield',
              input: true,
            },
            {
              label: 'Family Name (Japanese)',
              key: 'familyNameJapanese',
              type: 'textfield',
              input: true,
              disabled: true,
            },
            {
              label: 'First Name',
              key: 'firstName',
              type: 'textfield',
              input: true,
            },
            {
              label: 'First Name (Japanese)',
              key: 'firstNameJapanese',
              type: 'textfield',
              input: true,
              disabled: true,
            },
          ],
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'Japanese Name Translator',
          group: 'basic',
          icon: 'language',
          weight: 10,
          schema: JapaneseNameComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return JapaneseNameComponent.schema();
      }
  
      constructor(component, options, data) {
        super(component, options, data);
      }
  
      render(content) {
        return super.render(`
          <div class="japanese-name-component">
            <div>
              <label for="familyName">Family Name</label>
              <input type="text" ref="familyNameInput" id="familyName" />
            </div>
            <div>
              <label for="familyNameJapanese">Family Name (Japanese)</label>
              <input type="text" ref="familyNameJapaneseOutput" id="familyNameJapanese" readonly />
            </div>
            <div>
              <label for="firstName">First Name</label>
              <input type="text" ref="firstNameInput" id="firstName" />
            </div>
            <div>
              <label for="firstNameJapanese">First Name (Japanese)</label>
              <input type="text" ref="firstNameJapaneseOutput" id="firstNameJapanese" readonly />
            </div>
          </div>
        `);
      }
  
      attach(element) {
        this.loadRefs(element, {
          familyNameInput: 'single',
          familyNameJapaneseOutput: 'single',
          firstNameInput: 'single',
          firstNameJapaneseOutput: 'single',
        });
  
        this.addEventListener(this.refs.familyNameInput, 'input', () => {
          const familyName = this.refs.familyNameInput.value;
          this.refs.familyNameJapaneseOutput.value = this.convertToJapanese(familyName);
        });
  
        this.addEventListener(this.refs.firstNameInput, 'input', () => {
          const firstName = this.refs.firstNameInput.value;
          this.refs.firstNameJapaneseOutput.value = this.convertToJapanese(firstName);
        });
  
        return super.attach(element);
      }
  
      convertToJapanese(name) {
        if (!name) return '';
        const japaneseMap = {
          A: 'ア', B: 'ビ', C: 'シ', D: 'ディ', E: 'エ',
          F: 'フ', G: 'ジ', H: 'ヒ', I: 'イ', J: 'ジ',
          K: 'ケ', L: 'ル', M: 'ム', N: 'ン', O: 'オ',
          P: 'ピ', Q: 'キュ', R: 'リ', S: 'ス', T: 'ティ',
          U: 'ウ', V: 'ヴィ', W: 'ウィ', X: 'エクス', Y: 'イ',
          Z: 'ゼ',
          a: 'あ', b: 'び', c: 'し', d: 'でぃ', e: 'え',
          f: 'ふ', g: 'じ', h: 'ひ', i: 'い', j: 'じ',
          k: 'け', l: 'る', m: 'む', n: 'ん', o: 'お',
          p: 'ぴ', q: 'きゅ', r: 'り', s: 'す', t: 'てぃ',
          u: 'う', v: 'ゔぃ', w: 'うぃ', x: 'えくす', y: 'い',
          z: 'ぜ',
        };
  
        return name
          .split('')
          .map(char => japaneseMap[char] || char)
          .join('');
      }
    }
  
    Formio.Components.addComponent('japaneseName', JapaneseNameComponent);
  })();
  