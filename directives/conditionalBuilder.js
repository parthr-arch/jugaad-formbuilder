app.directive('conditionalBuilder', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      template: `
        <div class="group">
          <div class="group-header">
            <label>Group:</label>
            <select ng-model="group.type" ng-options="type for type in ['AND', 'OR']"></select>
            <button ng-click="addRule(group)">Add Rule</button>
            <button ng-click="addGroup(group)">Add Group</button>
          </div>
          <div class="group-content">
            <ul>
              <li ng-repeat="rule in group.rules">
                <div ng-if="rule.rules">
                  <conditional-builder data="rule"></conditional-builder>
                </div>
                <div ng-if="!rule.rules">
                  <input type="text" placeholder="Rule Condition" ng-model="rule.condition" />
                  <button ng-click="removeRule(group, $index)">Remove Rule</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      `,
      link: function(scope) {
        scope.addRule = function(group) {
          group.rules.push({ condition: '' });
        };

        scope.addGroup = function(group) {
          group.rules.push({
            type: 'AND',
            rules: []
          });
        };

        scope.removeRule = function(group, index) {
          group.rules.splice(index, 1);
        };
      }
    };
  });
