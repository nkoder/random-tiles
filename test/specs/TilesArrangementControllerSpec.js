describe('TilesArrangementController', function () {

    var $rootScope, $controller;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    it("should know that no tiles arrangement was generated", function () {
        // given:
        var scope = scopeAttachedToController();

        // when:

        // then:
        expect(scope.wasArrangementGenerated()).toBe(false);
    });

    it("should know that tiles arrangement was generated", function () {
        // given:
        var scope = scopeAttachedToController();

        // when:
        scope.generateArrangement();

        // then:
        expect(scope.wasArrangementGenerated()).toBe(true);
    });

    function scopeAttachedToController() {
        var scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
        return scope;
    }

});