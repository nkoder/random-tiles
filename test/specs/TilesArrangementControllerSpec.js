describe('TilesArrangementController', function () {

    var $rootScope, $controller;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    it("should not generate on init", function () {
        // given:
        var scope = scopeAttachedToController();

        // when:

        // then:
        expect(scope.arrangement).not.toBeDefined();
    });

    it("should generate next arrangement when asked to", function () {
        // given:
        var scope = scopeAttachedToController();

        // when:
        scope.generateNextArrangement();

        // then:
        expect(scope.arrangement).toBeDefined();
    });

    function scopeAttachedToController() {
        var scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
        return scope;
    }

});