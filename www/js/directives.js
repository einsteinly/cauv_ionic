angular.module('starter.directives', [])

.directive('ngJoystick', function($compile){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template:"<div id='_joystick' style='position: relative; height:500pt'> </div>",
		link: function(scope, tElement, attrs){

			var radius = 50;

			var joystickConfig = {
				zone: document.getElementById('_joystick'),
			    mode: 'dynamic',
			    position: {
			      left: '50%',
			      top: '100pt'
			    },
			    size: radius*2,
			    color: 'blue'
			};

			scope.joystick = nipplejs.create(joystickConfig);
			scope.position = {};
			var joystickCenter = {};

			scope.joystick.on('start end', function(evt, data) {
				  joystickCenter = scope.joystick[0].position;
				  scope.position.x = Math.round( (data.position.x - joystickCenter.x) / radius * 100 );
				  scope.position.y = - (Math.round( (data.position.y - joystickCenter.y) / radius * 100 ) );
				  if (!scope.$$phase) scope.$apply();
				}).on('move', function(evt, data) {
				  joystickCenter = scope.joystick[0].position;
				  scope.position.x = Math.round( (data.position.x - joystickCenter.x) / radius * 100 );
				  scope.position.y = -(Math.round( (data.position.y - joystickCenter.y) / radius * 100 ));
				  if (!scope.$$phase) scope.$apply();
				}).on('dir:up plain:up dir:left plain:left dir:down' +
				      'plain:down dir:right plain:right',
				      function(evt, data) {
				});		
		}
	}
})

