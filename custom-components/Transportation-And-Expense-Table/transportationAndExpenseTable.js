(function () {
    const FieldComponent = Formio.Components.components.field;
  
    class TransportationAndExpenseTableComponent extends FieldComponent {
      static schema(...extend) {
        return FieldComponent.schema({
          type: 'transportationAndExpenseTable',
          label: 'Transportation and Expense Table',
          key: 'transportationAndExpenseTable',
          input: false,
          ...extend,
        });
      }
  
      static get builderInfo() {
        return {
          title: 'Transportation and Expense Table',
          group: 'custom',
          icon: 'table',
          weight: 20,
          schema: TransportationAndExpenseTableComponent.schema(),
        };
      }
  
      get defaultSchema() {
        return TransportationAndExpenseTableComponent.schema();
      }
  
      constructor(component, options, data) {
        super(component, options, data);
      }
  
      render() {
        return super.render(`
          <div class="transportantion-and-expense-table-component">
            <h3>${this.component.label}</h3>
            <button class="btn btn-primary" ref="addRow">Add Row</button>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Date Range</th>
                  <th>Number of Days</th>
                  <th>Estimated Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody ref="tableBody">
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3"><strong>Total Estimated Amount</strong></td>
                  <td ref="totalAmount">0</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        `);
      }
  
      attach(element) {
        this.loadRefs(element, {
          addRow: 'single',
          tableBody: 'single',
          totalAmount: 'single',
        });
  
        // Attach Add Row button handler
        this.addEventListener(this.refs.addRow, 'click', () => this.addRow());
  
        return super.attach(element);
      }
  
      addRow() {
        const tableBody = this.refs.tableBody;
        const rowId = `row-${Date.now()}`;
  
        const row = document.createElement('tr');
        row.id = rowId;
  
        row.innerHTML = `
          <td><input type="text" class="form-control place-input" placeholder="Enter place"></td>
          <td>
            <input type="date" class="form-control start-date" onchange="window.updateDays('${rowId}')">
            <input type="date" class="form-control end-date" onchange="window.updateDays('${rowId}')">
          </td>
          <td class="days-count">0</td>
          <td><input type="number" class="form-control amount-input" placeholder="Enter amount" onchange="window.updateTotal()"></td>
          <td><button class="btn btn-danger" onclick="window.removeRow('${rowId}')">Remove</button></td>
        `;
  
        tableBody.appendChild(row);
      }
  
      calculateDays(startDate, endDate) {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        return timeDiff >= 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
      }
    }
  
    // Add utility functions to global scope to work with dynamically added rows
    window.updateDays = function (rowId) {
      const row = document.getElementById(rowId);
      const startDate = row.querySelector('.start-date').value;
      const endDate = row.querySelector('.end-date').value;
      const daysCount = row.querySelector('.days-count');
      const days = TableComponent.prototype.calculateDays(startDate, endDate);
      daysCount.textContent = days;
      window.updateTotal();
    };
  
    window.removeRow = function (rowId) {
      const row = document.getElementById(rowId);
      row.remove();
      window.updateTotal();
    };
  
    window.updateTotal = function () {
      const tableBody = document.querySelector('tbody[ref="tableBody"]');
      const amountInputs = tableBody.querySelectorAll('.amount-input');
      let total = 0;
  
      amountInputs.forEach((input) => {
        const value = parseFloat(input.value) || 0;
        total += value;
      });
  
      const totalAmountCell = document.querySelector('td[ref="totalAmount"]');
      totalAmountCell.textContent = total.toFixed(2);
    };
  
    // Register the custom component
    Formio.Components.addComponent('transportationAndExpenseTable', TransportationAndExpenseTableComponent);
  })();
  