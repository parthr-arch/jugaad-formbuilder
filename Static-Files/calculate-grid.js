var formSchema  = {
  components: [
    {
      type: 'table',
      input: false,
      numRows: 3,
      numCols: 2,
      key: 'tableData',
      rows: [
        [
          {
            components: [
              {
                type: 'number',
                key: 'value1',
                label: 'Value 1',
                input: true,
                validate: { required: true },
              },
            ],
          },
          {
            components: [
              {
                type: 'number',
                key: 'value2',
                label: 'Value 2',
                input: true,
                validate: { required: true },
              },
            ],
          },
        ],
        [
          {
            components: [
              {
                type: 'number',
                key: 'value1',
                label: 'Value 1',
                input: true,
              },
            ],
          },
          {
            components: [
              {
                type: 'number',
                key: 'value2',
                label: 'Value 2',
                input: true,
              },
            ],
          },
        ],
      ],
      footer: [
        [
          {
            components: [
              {
                type: 'html',
                tag: 'p',
                content: `<strong>Total:</strong> <span id="totalValue1">0</span>`,
              },
            ],
          },
          {
            components: [
              {
                type: 'html',
                tag: 'p',
                content: `<strong>Total:</strong> <span id="totalValue2">0</span>`,
              },
            ],
          },
        ],
      ],
    },
  ],
};