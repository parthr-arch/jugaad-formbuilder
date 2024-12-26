(function () {
  const FieldComponent = Formio.Components.components.field;

  class ScheduleTableComponent extends FieldComponent {
      static schema(...extend) {
          return FieldComponent.schema({
              type: 'scheduleTable',
              label: 'Schedule Table',
              key: 'scheduleTable',
              input: false,
              ...extend,
          });
      }

      static get builderInfo() {
          return {
              title: 'Schedule Table',
              group: 'custom',
              icon: 'table',
              weight: 20,
              schema: ScheduleTableComponent.schema(),
          };
      }

      get defaultSchema() {
          return ScheduleTableComponent.schema();
      }

      constructor(component, options, data) {
          super(component, options, data);
      }

      render() {
          return super.render(`
              <div class="schedule-table-component">
                  <h3>${this.component.label}</h3>
                  <button class="btn btn-primary" ref="addRow">Add Row</button>
                  <table class="table table-bordered">
                      <thead>
                          <tr>
                              <th>Date</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Transportation</th>
                              <th>Estimated Amount</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody ref="tableBody"></tbody>
                      <tfoot>
                          <tr>
                              <td colspan="4"><strong>Total Estimated Amount</strong></td>
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
              <td><input type="date" class="form-control date-picker" onchange="window.updateTotal()"></td>
              <td><input type="text" class="form-control from-input" placeholder="From"></td>
              <td><input type="text" class="form-control to-input" placeholder="To"></td>
              <td>
                  <select class="form-control transportation">
                      <option value="Car">Car</option>
                      <option value="Bus">Bus</option>
                      <option value="Train">Train</option>
                  </select>
              </td>
              <td><input type="number" class="form-control estimate-input" placeholder="Amount" onchange="window.updateTotal()"></td>
              <td><button class="btn btn-danger" onclick="window.removeRow('${rowId}')">Delete</button></td>
          `;

          tableBody.appendChild(row);
      }
  }

  // Utility functions for managing rows
  window.removeRow = function (rowId) {
      const row = document.getElementById(rowId);
      if (row) {
          row.remove();
          window.updateTotal();
      }
  };

  window.updateTotal = function () {
      const tableBody = document.querySelector('tbody[ref="tableBody"]');
      const amountInputs = tableBody.querySelectorAll('.estimate-input');
      let total = 0;

      amountInputs.forEach((input) => {
          const value = parseFloat(input.value) || 0;
          total += value;
      });

      const totalAmountCell = document.querySelector('td[ref="totalAmount"]');
      totalAmountCell.textContent = total.toFixed(2);
  };

  // Register the custom component
  Formio.Components.addComponent('scheduleTable', ScheduleTableComponent);
})();